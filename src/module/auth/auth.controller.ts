import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { Users } from '../entitys/Users';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('权限模块')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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

  @ApiOperation({ summary: '获取人机验证码', description: '极验api' })
  @Get('captchas')
  async getCaptchas(@Query('phone') phone: number) {
    return this.authService.getVerificationCode(phone);
  }

  @ApiOperation({ summary: '获取短信验证码 - 未完成', description: '未完成' })
  @Get('sms/captchas')
  async getSMSCaptchas(@Query('phone') phone: number) {
    return this.authService.getSMSVerificationCode(phone);
  }
}
