import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '邮箱' })
  email?: string;
  @ApiProperty({ description: '手机' })
  phone?: number;
}
