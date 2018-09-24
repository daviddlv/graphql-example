import { GraphQLUpload } from 'apollo-upload-server';
import { ArrayMaxSize, IsNotEmpty, Length } from 'class-validator';
import { Field, Float, ID, InputType } from 'type-graphql';
import { Ad } from '../models/ad';
import { Category } from '../models/category';
import { CategoryInput } from './category.input';

@InputType()
export class AdInput implements Partial<Ad> {
  @Field(type => CategoryInput)
  @IsNotEmpty()
  category: Category;

  @Field()
  @Length(10, 250)
  title: string;

  @Field({ nullable: true })
  @Length(10)
  description: string;

  @Field(type => Float)
  price: number;
}
