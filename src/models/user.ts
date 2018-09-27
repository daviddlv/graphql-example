import * as bcrypt from 'bcrypt-nodejs';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { JWT } from './jwt';

@Entity()
@Unique(['username'])
@Unique(['email'])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  readonly id: string;

  @Column()
  @Index({ unique: true })
  @Field(type => String)
  username: string;

  @Column()
  @Index({ unique: true })
  @Field(type => String)
  email: string;

  @Column()
  @Field(type => String)
  password: string;

  @Column()
  @Field(type => String)
  firstName: string;

  @Column()
  @Field(type => String)
  lastName: string;

  /*
  @Column('json')
  @Field(type => [String])
  roles: string[] = [];
  */

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updatedAt: Date;

  @Field(type => JWT)
  jwt: JWT;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }

  validatePassword(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  }
}
