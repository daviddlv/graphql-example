import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../models/user';
import { IsAlreadyExist } from '../validators/already-exists.validator';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @IsAlreadyExist({
    message: 'User $value already exists. Choose another username.'
  })
  username: string;

  @Field()
  @IsAlreadyExist({
    message: 'User $value already exists. Choose another email.'
  })
  email: string;

  @Field()
  @Length(8, 250)
  password: string;

  @Field() firstName: string;

  @Field() lastName: string;
}
