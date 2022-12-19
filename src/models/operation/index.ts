import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "../user";
import { Quota } from "../quota";

@Entity()
export class Operation {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user.operations, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false })
  totalValue: string;

  @Column({ nullable: false })
  createdDate: Date;

  @Column({})
  finalizationDate: Date;

  @OneToMany(() => Quota, (quotas) => quotas.operation, {
    eager: true,
  })
  quotas: Quota[];

  constructor(
    name: string,
    totalValue: string,
    createdDate: Date,
    finalizationDate: Date,
    user?: User
  ) {
    this.name = name;
    this.totalValue = totalValue;
    this.createdDate = createdDate;
    this.finalizationDate = finalizationDate;
    this.user = user;
  }
}
