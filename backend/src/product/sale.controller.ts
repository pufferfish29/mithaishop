import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { Public } from "../auth/decorators/auth-guard.decorator";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "./dto/create-sale.dto";

@Controller("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateSaleDto) {
    return this.saleService.create(dto);
  }

  @Get()
  @Public()
  aggregate(@Query("day") day: string) {
    return this.saleService.aggregateSold(day);
  }
}
