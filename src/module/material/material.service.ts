import { HttpException, Injectable } from '@nestjs/common';
import { UploadMaterialDto } from './dto/upload-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Users } from '../entitys/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from '../entitys/Material';
import { Repository } from 'typeorm';
import { MaterialLike } from '../entitys/MaterialLike';
import { LikeMaterialDto } from './dto/like-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(MaterialLike)
    private readonly materialLikeRepository: Repository<MaterialLike>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(file: Express.Multer.File, user: Users) {
    const material = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/static/${file.filename}`;
    try {
      await this.materialRepository
        .createQueryBuilder()
        .insert()
        .into(Material)
        .values([{ matter: material, userId: user.id }])
        .execute();

      return {
        imgs: material,
      };
    } catch (err) {
      throw new HttpException({ code: 400, message: '未知错误' }, 400);
    }
  }

  async findAll(id: number) {
    return this.materialRepository
      .createQueryBuilder('m')
      .select()
      .where('m.user_id = :id', { id })
      .getMany();
  }

  async likeMaterial(likeMaterialDto: LikeMaterialDto, userId: number) {
    const doesItExist: MaterialLike = await this.materialLikeRepository.findOne(
      {
        userId,
        like: likeMaterialDto.id,
      },
    );
    if (doesItExist) {
      throw new HttpException({ code: 400, message: '已经添加过了' }, 400);
    }
    return this.materialLikeRepository
      .createQueryBuilder()
      .insert()
      .into(MaterialLike)
      .values([{ userId, like: likeMaterialDto.id }])
      .execute();
  }

  async getAllLike(id: number): Promise<Material[]> {
    const sql = `select material.* from users join material_like on users.id = material_like.user_id join material on  material.id = material_like.like where material.user_id = ${id}`;
    return await this.userRepository.query(sql);
  }

  async remove(id: number) {
    return this.materialRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
