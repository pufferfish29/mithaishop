import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/prodcut.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { Sale } from "./entities/sale.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existing = await this.productRepository.findOneBy({
      name: createProductDto.name,
    });
    if (existing) {
      throw new ConflictException("Product already exists");
    }
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async findAll(page = 1) {
    const take = 50;
    const skip = (Math.max(1, page) - 1) * take;
    const [items, total] = await this.productRepository.findAndCount({
      order: { name: "ASC" },
      take,
      skip,
    });
    return { total, page, items };
  }

  async findOne(idOrName: number | string) {
    const where =
      typeof idOrName === "number" ? { id: idOrName } : { name: idOrName };
    const product = await this.productRepository.findOneBy(where);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Product not found");
    }
    return { deleted: true };
  }

  async topSales(range: string, limit = 10) {
    const match = /^([1-9]\d*)(day|week|month)$/.exec(range || "");
    if (!match) {
      throw new Error(
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
          0,
          0,
          0,
          0,
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

    const qb = this.productRepository
      .createQueryBuilder("p")
      .leftJoin(Sale, "s", "s.productId = p.id")
      .select([
        "p.id AS product_id",
        "p.name AS product_name",
        "COALESCE(SUM(s.quantity), 0) AS total_qty",
        "COALESCE(SUM(s.total_amount), 0) AS total_amount",
      ])
      .where("s.created_at BETWEEN :from AND :to", {
        from: fromUTC.toISOString(),
        to: toUTC.toISOString(),
      })
      .groupBy("p.id, p.name")
      .orderBy("total_qty", "DESC")
      .limit(Math.max(1, limit));

    const rows = await qb.getRawMany<{
      product_id: number;
      product_name: string;
      total_qty: string;
      total_amount: string;
    }>();

    return rows.map((r) => ({
      productId: Number(r.product_id),
      productName: r.product_name,
      totalQuantity: Number(r.total_qty),
      totalAmount: Number(r.total_amount),
    }));
  }
}
