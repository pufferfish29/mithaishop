import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  pricePerKG: number;
}
