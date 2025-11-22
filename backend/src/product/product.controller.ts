import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Public } from "../auth/decorators/auth-guard.decorator";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @Public()
  findAll(@Query("page") page?: number) {
    return this.productService.findAll(Number(page) || 1);
  }

  @Get(":idOrName")
  @Public()
  findOne(@Param("idOrName") idOrName: string) {
    const parsedId = Number(idOrName);
    return this.productService.findOne(isNaN(parsedId) ? idOrName : parsedId);
  }

  @Get("/top/sales")
  @Public()
  topSales(@Query("day") day: string, @Query("limit") limit?: number) {
    return this.productService.topSales(day, Number(limit) || 10);
  }

  @Delete(":id")
  @Public()
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
