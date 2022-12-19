import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Quota } from "../quota";
import { QuotaItem } from "../quotaItens";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Quota, (quota) => quota.items, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "quota_id" })
  quota?: Quota;

  @Column({ nullable: false })
  numeroLote: Number;

  @Column({ nullable: false, length: 128 })
  guide: string;

  @Column({ nullable: false })
  charge: Number;

  @Column({ nullable: false })
  totalValue: Number;

  quotaItems: QuotaItem[];

  constructor(
    numeroLote: Number,
    guide: string,
    charge: Number,
    totalValue: Number,
    quota?: Quota
  ) {
    this.numeroLote = numeroLote;
    this.guide = guide;
    this.totalValue = totalValue;
    this.charge = charge;
    this.quota = quota;
  }
}
