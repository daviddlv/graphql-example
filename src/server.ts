import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import { printSchema } from 'graphql';
import * as morgan from 'morgan';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { User } from './models/user';
import { getSchema } from './schema';

TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

export async function setupGraphQLServer() {
  const app = express();

  app.use('/graphql', async (req, res, done) => {
    if (req.user !== undefined) {
      req.user = await TypeORM.getRepository(User).findOne(req.user);
    }
    done();
  });

  app.use(morgan('combined'));
  app.use(errorHandler());

  const schema = await getSchema();
  app.use('/schema', (req, res, _next) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
  });

  const server = new ApolloServer({
    context: ({ req }) => ({
      user: req.user
    }),
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    schema,
    uploads: true
  });
  server.applyMiddleware({ app });

  return app;
}

async function bootstrap() {
  await TypeORM.createConnection();
  dotenv.config();

  const app = await setupGraphQLServer();

  app.listen(
    {
      port: process.env.GRAPHQL_PORT
    },
    () => {
      console.log(`Server ready`);
    }
  );
}

bootstrap().catch(err => {
  console.log(err);
});
