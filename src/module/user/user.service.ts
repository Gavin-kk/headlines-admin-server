import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entitys/Users';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findOne(id: number) {
    const user: Users = await this.userRepository.findOne(id);
    delete user.password;
    return user;
  }

  async avatarUpload(file: Express.Multer.File, user: Users) {
    console.log(file);
    const { filename } = file;
    const { id } = user;
    const path = [
      `http://${process.env.APP_HOST}:${process.env.APP_PORT}/static/${filename}`,
    ];

    await this.userRepository
      .createQueryBuilder()
      .update({
        avatar: path,
      })
      .where('id = :id', { id })
      .execute();
    return path;
  }

  async update(updateUserDto: UpdateUserDto, { id }: Users) {
    return this.userRepository
      .createQueryBuilder()
      .update({ ...updateUserDto })
      .where('id = :id', { id })
      .execute();
  }

  async saveUser(user: RegisterDto) {
    return this.userRepository.save(user);
  }
}
