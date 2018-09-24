import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class JWT {
  @Field(type => String)
  token: string;

  @Field(type => Int)
  expiresIn: number;
}
