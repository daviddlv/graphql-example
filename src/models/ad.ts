import { Field, Float, ID, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Category } from './category';
import { User } from './user';

@Entity()
@ObjectType()
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  readonly id: string;

  @ManyToOne(type => User, { eager: true, nullable: false })
  @JoinColumn()
  @Field(type => User)
  author: User;

  @ManyToOne(type => Category, { eager: true, nullable: false })
  @JoinColumn()
  @Field(type => Category)
  category: Category;

  @Column()
  @Field()
  title: string;

  @Column('text')
  @Field()
  description: string;

  @Column('float')
  @Field(type => Float)
  price: number;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updatedAt: Date;
}
