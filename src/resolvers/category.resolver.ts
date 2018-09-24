import { Arg, Query, Resolver } from 'type-graphql';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from '../models/category';

@Resolver(Category)
export class CategoryResolver {
  constructor(@InjectRepository(Category) private readonly repository: TreeRepository<Category>) {}

  @Query(returns => Category, { nullable: true })
  async category(@Arg('id') id: string) {
    return this.repository.findOne(id);
  }

  @Query(returns => [Category])
  async categories(): Promise<Category[]> {
    return this.repository.find();
  }

  @Query(returns => Category, { nullable: true })
  async tree(@Arg('id') id: string) {
    const category = await this.repository.findOne(id);

    if (!category) {
      throw new Error('Category not found');
    }

    return this.repository.findDescendantsTree(category);
  }
}
