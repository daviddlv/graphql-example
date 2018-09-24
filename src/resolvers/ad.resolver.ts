import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  ResolverInterface
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AdInput } from '../inputs/ad.input';
import { Ad } from '../models/ad';
import { Context } from '../types/context';

@Resolver(Ad)
export class AdResolver {
  constructor(@InjectRepository(Ad) private readonly repository: Repository<Ad>) {}

  @Query(returns => Ad, { nullable: true })
  async ad(@Arg('id') id: string) {
    return this.repository.findOne(id);
  }

  @Query(returns => [Ad])
  async ads(): Promise<Ad[]> {
    return this.repository.find();
  }

  @Authorized()
  @Mutation(returns => Ad)
  async addAd(@Arg('ad') adInput: AdInput, @Ctx() { user }: Context): Promise<Ad> {
    const ad = this.repository.create({
      ...adInput,
      author: user
    });
    return this.repository.save(ad);
  }
}
