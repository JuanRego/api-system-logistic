import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Operation } from "../operation";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, length: 128, unique: true })
  email: string;

  @Column({ nullable: false, length: 11, unique: true })
  cellphone: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isOperator: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: false, length: 128 })
  @Exclude()
  password: string;

  @OneToMany(() => Operation, (operations) => operations.user, {
    eager: true,
  })
  operations: Operation[];

  constructor(
    name: string,
    email: string,
    cellphone: string,
    password: string,
    isAdmin: boolean,
    isOperator: boolean,
    isVerified: boolean
  ) {
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isOperator = isOperator;
    this.isVerified = isVerified;
  }
}
