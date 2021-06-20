import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GeographicService } from './geographic.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('城市模块')
@Controller('geographic')
export class GeographicController {
  constructor(private readonly geographicService: GeographicService) {}

  @ApiOperation({ summary: '级联选择查询城市' })
  @Get()
  findAll(@Query('id') id: string) {
    return this.geographicService.findAll(+id);
  }
}
