import { ApiProperty } from '@nestjs/swagger';

export class UploadCoverDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  contentFile: string[];
}
