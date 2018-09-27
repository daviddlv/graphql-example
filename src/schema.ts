import { GraphQLSchema } from 'graphql';
import { BuildSchemaOptions, buildSchemaSync } from 'type-graphql';

export function getSchema(): GraphQLSchema {
  const options: BuildSchemaOptions = {
    dateScalarMode: 'isoDate',
    resolvers: [__dirname + '/resolvers/**/*.ts', __dirname + '/subscriptions/**/*.ts']
  };

  return buildSchemaSync(options);
}
