import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { TFindUserType } from './types/user.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;

    const { identifiers } = await this.userRepository.insert({
      email,
      username,
      password,
    });

    if (identifiers.length > 0) {
      return {
        email,
        username,
        id: (identifiers[0] as { id: number }).id,
      };
    } else {
      throw new Error('User not created');
    }
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
      select: { username: true, email: true, id: true, password: true },
    });
  }
}
