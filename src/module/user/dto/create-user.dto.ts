import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Users } from 'src/module/entitys/Users';

export class RegisterDto extends Users {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不得为空' })
  password: string;

  @ApiProperty({ description: '手机号' })
  phone: number;

  @ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty({ description: '头条号简介' })
  intro: string;

  @ApiProperty({ description: '昵称', required: false })
  nickname: string;
}
