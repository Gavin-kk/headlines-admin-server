import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';
import { hashSync } from 'bcryptjs';
import * as moment from 'moment';

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

  @Column('varchar', { name: 'avatar', nullable: true, length: 500 })
  avatar: string | null;
}
