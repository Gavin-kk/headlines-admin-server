import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entitys/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user: Users = await this.userRepository.findOne(id);
    delete user.password;
    return user;
  }

  async avatarUpload(file: Express.Multer.File, user: Users) {
    const { filename } = file;
    const { id } = user;
    return await this.userRepository
      .createQueryBuilder()
      .update({
        avatar: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/static/${filename}`,
      })
      .where('id = :id', { id })
      .execute();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
