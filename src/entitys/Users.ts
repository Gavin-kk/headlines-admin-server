import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_fe0bb3f6520ee0469504521e71", ["username"], { unique: true })
@Index("username", ["username"], { unique: true })
@Entity("users", { schema: "headline_admin" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", unique: true, length: 30 })
  username: string;

  @Column("varchar", { name: "password", length: 500 })
  password: string;

  @Column("varchar", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("timestamp", {
    name: "createAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date | null;

  @Column("timestamp", {
    name: "updateAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updateAt: Date | null;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone: string | null;

  @Column("varchar", { name: "avatar", nullable: true, length: 500 })
  avatar: string | null;

  @Column("text", { name: "intro", nullable: true })
  intro: string | null;
}
