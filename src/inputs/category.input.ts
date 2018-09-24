import { GraphQLUpload } from 'apollo-upload-server';
import { Field, ID, InputType } from 'type-graphql';
import { Category } from '../models/category';

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field(type => ID)
  id: string;
}
