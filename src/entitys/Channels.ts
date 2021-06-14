import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("channels", { schema: "headline_admin" })
export class Channels {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;
}
