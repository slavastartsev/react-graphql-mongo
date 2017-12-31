import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import DataLoader from 'dataloader';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 8081;
const endpointURL = '/graphql';

const app = express();

app.use(cors('*'));
app.use(morgan('combined'));
app.use(endpointURL, bodyParser.json(), graphqlExpress({
  schema,
  context: {
    ...models,
  },
}));
app.use('/graphiql', graphiqlExpress({ endpointURL }));
// app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console no-trailing-spaces
  console.log('\x1b[35m%s\x1b[36m%s\x1b[0m', 'Server is running at ', `http://localhost:${PORT}`);
});
