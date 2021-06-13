import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { Users } from '../entitys/Users';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // @Post('register')
  // async register(@Body() registerDto: RegisterDto) {}
  @ApiOperation({ summary: '用户登录接口', description: '返回token' })
  @ApiBody({
    description: '用户名和密码',
    type: LoginDto,
  })
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
