import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Operation } from "../operation";
import { Item } from "../item";

@Entity()
export class Quota {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Operation, (operation) => operation.quotas, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "operation_id" })
  operation?: Operation;

  @Column({ nullable: false })
  numeroLote: Number;

  @Column({ nullable: false, length: 128 })
  guide: string;

  @Column({ nullable: false })
  charge: Number;

  @Column({ nullable: false })
  totalValue: Number;

  @OneToMany(() => Item, (items) => items.quota, {
    eager: true,
  })
  items: Item[];

  constructor(
    numeroLote: Number,
    guide: string,
    charge: Number,
    totalValue: Number,
    operation?: Operation
  ) {
    this.numeroLote = numeroLote;
    this.guide = guide;
    this.totalValue = totalValue;
    this.charge = charge;
    this.operation = operation;
  }
}
