import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '邮箱' })
  email?: string;
  @ApiProperty({ description: '手机' })
  phone?: number;
  @ApiProperty({ description: '用户简介' })
  intro?: string;
  @ApiProperty({ description: '用户昵称' })
  nickname?: string;
  @ApiProperty({ description: '性别' })
  gender?: string;
  @ApiProperty({ description: '出生年月日' })
  dateOfBirth?: number;
  @ApiProperty({ description: '所在城市' })
  city?: { id: number; city: string }[];
}
