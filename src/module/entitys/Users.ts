import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcryptjs';
import * as moment from 'moment';
import { Material } from './Material';
import { MaterialLike } from './MaterialLike';
import { Comment } from './Comment';
import { Article } from './Article';

export enum Gender {
  male = '男',
  female = '女',
}

@Index('IDX_fe0bb3f6520ee0469504521e71', ['username'], { unique: true })
@Index('username', ['username'], { unique: true })
@Entity('users', { schema: 'nest_admin' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', unique: true, length: 30 })
  username: string;

  @Column('varchar', {
    name: 'password',
    length: 500,
    transformer: {
      to(value: string): string {
        return hashSync(value);
      },
      from(value: string): string {
        return value;
      },
    },
  })
  password: string;

  @Column('varchar', { name: 'phone', nullable: true, length: 50 })
  phone: number | null;

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('varchar', { name: 'nickname', nullable: true, length: 50 })
  nickname: string | null;

  @Column({ type: 'enum', enum: Gender, name: 'gender', default: Gender.male })
  gender: string | null;

  @Column({ type: 'bigint', name: 'date_birth', nullable: true })
  dateOfBirth: number | null;

  @Column({ type: 'simple-json', name: 'city', nullable: true })
  city: { id: number; city: string }[];

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

  @Column('simple-json', { name: 'avatar', nullable: true })
  avatar: string[] | null;

  @Column('text', { name: 'intro', nullable: true })
  intro: string | null;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Material, (material) => material.user)
  materials: Material[];

  @OneToMany(() => MaterialLike, (materialLike) => materialLike.user)
  materialLikes: MaterialLike[];
}
