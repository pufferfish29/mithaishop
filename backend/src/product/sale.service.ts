import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sale } from "./entities/sale.entity";
import { Product } from "./entities/prodcut.entity";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { SaleAggregateRow, WeeklySaleSummery } from "./types/product.type";

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateSaleDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException("Product not found");
    const sale = this.saleRepository.create({
      product,
      quantity: dto.quantity,
      totalAmount: dto.totalAmount,
    });
    return this.saleRepository.save(sale);
  }

  async aggregateSold(range: string) {
    const match = /^([1-9]\d*)(day|week|month)$/.exec(range || "");
    if (!match) {
      throw new BadRequestException(
        "Invalid 'day' query. Use like 7day, 1week, 1month, 3month",
      );
    }

    const n = parseInt(match[1], 10);
    const unit = match[2] as "day" | "week" | "month";

    const now = new Date();

    let fromUTC: Date;
    if (unit === "day") {
      fromUTC = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - (n - 1),
          ...[0, 0, 0, 0],
        ),
      );
    } else if (unit === "week") {
      fromUTC = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - (n * 7 - 1),
          0,
          0,
          0,
          0,
        ),
      );
    } else {
      fromUTC = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth() - (n - 1),
          1,
          0,
          0,
          0,
          0,
        ),
      );
    }

    const toUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    const rows: SaleAggregateRow[] = await this.saleRepository
      .createQueryBuilder("s")
      .leftJoin("s.product", "p")
      .select([
        "p.id as product_id",
        "p.name as product_name",
        "DATE_TRUNC('day', s.created_at AT TIME ZONE 'UTC') as bucket",
        "SUM(s.quantity) as total_qty",
        "SUM(s.total_amount) as total_amount",
      ])
      .where("s.created_at BETWEEN :from AND :to", {
        from: fromUTC.toISOString(),
        to: toUTC.toISOString(),
      })
      .groupBy("p.id, p.name, bucket")
      .orderBy("bucket", "ASC")
      .getRawMany<SaleAggregateRow>();

    const days: string[] = [];
    const cursor = new Date(fromUTC);
    while (cursor <= toUTC) {
      days.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const byProduct: Record<
      string,
      Record<string, { qty: number; amount: number }>
    > = {};
    for (const r of rows) {
      const d = new Date(r.bucket).toISOString().slice(0, 10);
      const pid = String(r.product_id);
      byProduct[pid] ||= {};
      byProduct[pid][d] = {
        qty: Number(r.total_qty),
        amount: Number(r.total_amount),
      };
    }

    const series = Object.entries(byProduct).map(([pid, map]) => ({
      productId: Number(pid),
      productName: rows.find((r) => String(r.product_id) === pid)?.product_name,
      data: days.map((d) => ({
        date: d,
        quantity: map[d]?.qty || 0,
        amount: map[d]?.amount || 0,
      })),
    }));

    return {
      from: fromUTC.toISOString(),
      to: toUTC.toISOString(),
      days,
      series,
    };
  }

  async getWeeklySaleSummery() {
    const saleQuery: WeeklySaleSummery[] = await this.saleRepository
      .createQueryBuilder("sale")
      .select("EXTRACT(DOW from sale.created_at)", "day_of_week")
      .addSelect("SUM(sale.total_amount)", "total_sale")
      .where("sale.created_at >= date_trunc('week', NOW()) - interval '1 day' ")
      .groupBy("day_of_week")
      .orderBy("day_of_week")
      .getRawMany();
    return saleQuery.map((s) => ({
      day_of_week: Number(s.day_of_week),
      total_sale: Number(s.total_sale),
    }));
  }
}
