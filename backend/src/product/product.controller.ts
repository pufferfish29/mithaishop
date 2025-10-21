import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Public } from "src/auth/decorators/auth-guard.decorator";

@Controller("products")
export class ServicesController {
  constructor(private readonly servicesService: ProductService) {}

  @Post()
  @Public()
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.servicesService.create(CreateProductDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
