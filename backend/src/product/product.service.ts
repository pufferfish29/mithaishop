import { ConflictException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/prodcut.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create(createProductDto: CreateProductDto) {
    const prod = await this.productRepository.findOneBy({
      name: createProductDto.name,
    });
    if (prod) {
      throw new ConflictException("product already exists");
    }
    await this.productRepository.insert(createProductDto);
    return createProductDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
