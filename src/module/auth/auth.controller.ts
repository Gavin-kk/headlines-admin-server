import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { Users } from '../entitys/Users';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // @Post('register')
  // async register(@Body() registerDto: RegisterDto) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@CurrentUser() user: Users) {
    const { username, password } = user;
    const token: string = this.jwtService.sign(
      { username, password },
      {
        expiresIn: '1 days',
      },
    );
    delete user.password;
    return {
      user,
      token,
    };
  }
}
