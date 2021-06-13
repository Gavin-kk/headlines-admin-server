import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '邮箱' })
  email?: string;
  @ApiProperty({ description: '手机' })
  phone?: number;
  @ApiProperty({ description: '头条号简介' })
  intro?: string;
}
