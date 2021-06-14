import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channels } from '../entitys/Channels';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channels)
    private readonly channelsRepository: Repository<Channels>,
  ) {}

  async create(createChannelDto: CreateChannelDto) {
    return this.channelsRepository.save(createChannelDto);
  }

  findAll() {
    return this.channelsRepository.find();
  }

  findOne(id: number) {
    return this.channelsRepository.findOne(id);
  }

  update({ name, id }: UpdateChannelDto) {
    return this.channelsRepository
      .createQueryBuilder()
      .update({ name })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.channelsRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id });
  }
}
