import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { MaterialLike } from './MaterialLike';
import * as moment from 'moment';

@Index('material_user_id', ['userId'], {})
@Entity('material', { schema: 'headline_admin' })
export class Material {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'matter', nullable: true, length: 400 })
  matter: string | null;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('bit', { name: 'like', nullable: true })
  like: boolean | null;

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

  @ManyToOne(() => Users, (users) => users.materials, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(() => MaterialLike, (materialLike) => materialLike.like2)
  materialLikes: MaterialLike[];
}
