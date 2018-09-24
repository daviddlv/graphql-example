import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent
} from 'typeorm';

@Entity()
@Tree('nested-set')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  readonly id: string;

  @Column()
  @Field()
  name: string;

  @TreeLevelColumn()
  @Field(type => Int)
  lvl: number;

  @TreeChildren()
  @Field(type => [Category])
  children: Category[];

  @TreeParent()
  @Field(type => Category, { nullable: true })
  parent: Category | null;
}
