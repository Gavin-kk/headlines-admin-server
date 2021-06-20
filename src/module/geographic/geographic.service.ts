import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geographic } from '../entitys/Geographic';

@Injectable()
export class GeographicService {
  constructor(
    @InjectRepository(Geographic)
    private readonly geographicRepository: Repository<Geographic>,
  ) {}
  async findAll(id = 1) {
    return this.geographicRepository.find({ parentId: id });
  }
}
