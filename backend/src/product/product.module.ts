import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ServicesController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/prodcut.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ServicesController],
  providers: [ProductService],
})
export class ProductModule {}
