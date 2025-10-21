import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/prodcut.entity";
import { CreateProductDto } from "./dto/create-product.dto";

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
    const skip = (page - 1) * take;
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
}
