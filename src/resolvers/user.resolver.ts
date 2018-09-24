import * as jwt from 'jsonwebtoken';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserInput } from '../inputs/user.input';
import { JWT } from '../models/jwt';
import { User } from '../models/user';

@Resolver(User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  @Query(returns => User, { nullable: true })
  async user(@Arg('id') id: string) {
    return this.repository.findOne(id);
  }

  @Query(returns => Boolean)
  async exists(
    @Arg('username', { nullable: true })
    username: string,
    @Arg('email', { nullable: true })
    email: string
  ) {
    if (username) {
      return (await this.repository.count({ username })) > 0;
    }
    if (email) {
      return (await this.repository.count({ email })) > 0;
    }

    throw new Error('Username or Email must be defined');
  }

  @Mutation(returns => User)
  async signUp(@Arg('user') userInput: UserInput): Promise<User> {
    const user = this.repository.create({
      ...userInput
    });

    return this.repository.save(user);
  }

  @Mutation(returns => User)
  async signIn(@Arg('username') username: string, @Arg('password') password: string): Promise<User> {
    const user = await this.repository.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      throw new Error('Password is incorrect');
    }

    return user;
  }

  @FieldResolver()
  async jwt(@Root() user: User): Promise<JWT> {
    if (process.env.TOKEN_SECRET === undefined || process.env.TOKEN_EXPIRES_IN === undefined) {
      throw new Error('TOKEN_SECRET and TOKEN_EXPIRES_IN env must be defined');
    }

    const _jwt = new JWT();
    _jwt.token = jwt.sign({ user: user.id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
    _jwt.expiresIn = parseInt(process.env.TOKEN_EXPIRES_IN, 10);

    return _jwt;
  }
}
