import { Body, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { TFindUserType } from "./types/user.type";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  updatePassword(userId: number, hashedPassword: string) {
    return this.userRepository.update(
      { id: userId },
      { password: hashedPassword },
    );
  }

  async create(@Body() createUserDto: CreateUserDto) {
    const userPromise = this.userRepository.create(createUserDto);
    const { username, email, id, role } =
      await this.userRepository.save(userPromise);
    return { username, email, id, role };
  }

  findOne(by: TFindUserType) {
    return this.userRepository.findOne({
      where: { ...by },
      select: { username: true, email: true, id: true },
    });
  }

  unsafeFindOne(by: TFindUserType) {
    return this.userRepository.findOne({
      where: { ...by },
      select: {
        username: true,
        email: true,
        id: true,
        password: true,
        role: true,
      },
    });
  }
}
