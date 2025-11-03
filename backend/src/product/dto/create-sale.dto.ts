import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateSaleDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  totalAmount: number;
}
