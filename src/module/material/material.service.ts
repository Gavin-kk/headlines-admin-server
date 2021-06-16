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
    try {
      // 如果已经喜欢过了 再次喜欢就是取消喜欢
      if (doesItExist) {
        // 把素材表中的是否喜欢设置为false
        await this.materialRepository
          .createQueryBuilder()
          .update()
          .set({ like: false })
          .where('id = :id', { id: likeMaterialDto.id })
          .execute();
        // 删除喜欢表中的数据
        await this.materialLikeRepository
          .createQueryBuilder()
          .delete()
          .where('like = :id', { id: likeMaterialDto.id })
          .execute();
        return '取消喜欢成功';
      }
      // 如果没有喜欢过 执行下面代码
      await this.materialRepository
        .createQueryBuilder()
        .update()
        .set({ like: true })
        .where('id = :id', { id: likeMaterialDto.id })
        .execute();
      await this.materialLikeRepository
        .createQueryBuilder()
        .insert()
        .into(MaterialLike)
        .values([{ userId, like: likeMaterialDto.id }])
        .execute();
      return '添加喜欢成功';
    } catch (err) {
      throw new HttpException({ code: 400, message: '未知错误' }, 400);
    }
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
