import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/prodcut.entity";
import { Sale } from "./entities/sale.entity";
import { SaleService } from "./sale.service";
import { SaleController } from "./sale.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sale])],
  controllers: [ProductController, SaleController],
  providers: [ProductService, SaleService],
})
export class ProductModule {}
