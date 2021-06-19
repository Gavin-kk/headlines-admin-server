import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Material } from './Material';
import * as moment from 'moment';

@Index('material_like', ['like'], {})
@Index('material_users_id', ['userId'], {})
@Entity('material_like', { schema: 'headline_admin' })
export class MaterialLike {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'like', comment: '用户喜欢的素材' })
  like: number;

  @Column('int', { name: 'user_id', comment: '用户' })
  userId: number;

  @Column('timestamp', {
    name: 'createAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to(value: string): string {
        return value;
      },
      from(value: string): number {
        return moment(value).valueOf();
      },
    },
  })
  createAt: Date | null;

  @Column('timestamp', {
    name: 'updateAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      to(value: string): string {
        return value;
      },
      from(value: string): number {
        return moment(value).valueOf();
      },
    },
  })
  updateAt: Date | null;

  @ManyToOne(() => Users, (users) => users.materialLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Material, (material) => material.materialLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'like', referencedColumnName: 'id' }])
  like2: Material;
}
