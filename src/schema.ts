import { buildSchema, BuildSchemaOptions } from 'type-graphql';

export async function getSchema() {
  const options: BuildSchemaOptions = {
    dateScalarMode: 'isoDate',
    resolvers: [__dirname + '/resolvers/**/*.ts', __dirname + '/subscriptions/**/*.ts']
  };

  return buildSchema(options);
}
