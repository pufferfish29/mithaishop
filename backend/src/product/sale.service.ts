import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sale } from "./entities/sale.entity";
import { Product } from "./entities/prodcut.entity";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { SaleAggregateRow } from "./types/product.type";

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateSaleDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException("Product not found");
    const sale = this.saleRepo.create({
      product,
      quantity: dto.quantity,
      totalAmount: dto.totalAmount,
    });
    return this.saleRepo.save(sale);
  }

  async aggregateSold(range: string) {
    const match = /^([1-9]\d*)(day|week|month)$/.exec(range || "");
    if (!match) {
      throw new Error(
        "Invalid 'day' query. Use like 7day, 1week, 1month, 3month",
      );
    }
    const n = parseInt(match[1], 10);
    const unit = match[2] as "day" | "week" | "month";

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    let from = new Date(now);
    if (unit === "day") from.setDate(now.getDate() - (n - 1));
    if (unit === "week") from.setDate(now.getDate() - (n * 7 - 1));
    if (unit === "month")
      from = new Date(now.getFullYear(), now.getMonth() - (n - 1), 1);

    if (from < startOfYear) from = startOfYear;

    const rows: SaleAggregateRow[] = await this.saleRepo
      .createQueryBuilder("s")
      .leftJoin("s.product", "p")
      .select([
        "p.id as product_id",
        "p.name as product_name",
        "DATE_TRUNC('day', s.created_at) as bucket",
        "SUM(s.quantity) as total_qty",
        "SUM(s.total_amount) as total_amount",
      ])
      .where("s.created_at >= :from AND s.created_at <= :to", { from, to: now })
      .groupBy("p.id, p.name, bucket")
      .orderBy("bucket", "ASC")
      .getRawMany<SaleAggregateRow>();

    const days: string[] = [];
    const cursor = new Date(from);
    while (cursor <= now) {
      days.push(cursor.toISOString().slice(0, 10));
      cursor.setDate(cursor.getDate() + 1);
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

    return { from: from.toISOString(), to: now.toISOString(), days, series };
  }
}
