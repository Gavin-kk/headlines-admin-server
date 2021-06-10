import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";

@Index("IDX_fe0bb3f6520ee0469504521e71", ["username"], { unique: true })
@Index("role_id", ["roleId"], {})
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

  @Column("int", { name: "role_id", nullable: true })
  roleId: number | null;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone: string | null;

  @Column("varchar", { name: "avatar", nullable: true, length: 500 })
  avatar: string | null;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;
}
