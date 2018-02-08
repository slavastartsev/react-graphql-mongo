import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import DataLoader from 'dataloader';

import models from './models';

const SECRET = 'asdfghqwerty123456';
const SECRET2 = 'asdfghqwerty123456uiojkl';

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

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(cors('*'));
app.use(addUser);
app.use(morgan('combined'));
app.use(endpointURL, bodyParser.json(), graphqlExpress({
  schema,
  context: {
    ...models,
    SECRET,
    SECRET2,
  },
}));
app.use('/graphiql', graphiqlExpress({ endpointURL }));
// app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console no-trailing-spaces
  console.log('\x1b[35m%s\x1b[36m%s\x1b[0m', 'Server is running at ', `http://localhost:${PORT}`);
});
