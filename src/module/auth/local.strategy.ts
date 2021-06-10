import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entitys/Users';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user: Users = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new HttpException({ code: 400, message: '用户不存在' }, 400);
    }
    //  验证密码
    if (!compareSync(password, user.password)) {
      throw new HttpException({ code: 400, message: '密码错误' }, 400);
    }

    return user;
  }
}
