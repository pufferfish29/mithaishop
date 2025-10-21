import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindUserDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
