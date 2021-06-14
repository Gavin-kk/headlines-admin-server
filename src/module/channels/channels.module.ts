import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from '../entitys/Channels';

@Module({
  imports: [TypeOrmModule.forFeature([Channels])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
