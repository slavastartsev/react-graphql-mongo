import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';

import createStore from './store';

// global styles
// eslint-disable-next-line
injectGlobal`
  body {
    background-color: #f7f7f7;
    padding: 0;
    margin: 0;
    font-family: cursive;
  }
`;

const httpLink = createHttpLink({ uri: 'http://localhost:8081/graphql' });

const middlewareLink = setContext(() => ({
  headers: {},
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  return forward(operation);
});

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  // dataIdFromObject: object => object.id,
});

const store = createStore();

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);
