import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('频道模块')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiOperation({ summary: '创建频道' })
  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @ApiOperation({ summary: '获取所有频道' })
  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @ApiOperation({ summary: '获取某一个频道' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(+id);
  }

  @ApiOperation({ summary: '更新频道名称' })
  @Patch()
  update(@Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(updateChannelDto);
  }

  @ApiOperation({ summary: '删除频道' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelsService.remove(+id);
  }
}
