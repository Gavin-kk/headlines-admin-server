import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaterialLike } from "./MaterialLike";
import { Material } from "./Material";
import { Comment } from "./Comment";
import { Article } from "./Article";

@Index("username", ["username"], { unique: true })
@Index("IDX_fe0bb3f6520ee0469504521e71", ["username"], { unique: true })
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

  @Column("text", { name: "intro", nullable: true })
  intro: string | null;

  @Column("text", { name: "avatar", nullable: true })
  avatar: string | null;

  @OneToMany(() => MaterialLike, (materialLike) => materialLike.user)
  materialLikes: MaterialLike[];

  @OneToMany(() => Material, (material) => material.user)
  materials: Material[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
