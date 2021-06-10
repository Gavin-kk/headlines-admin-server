import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entitys/Users';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }
  async validate({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user: Users = await this.usersRepository.findOne({ username });
    if (!user || user.password !== password) {
      throw new HttpException({ code: 400, msg: '失效' }, 400);
    }
    return user;
  }
}
