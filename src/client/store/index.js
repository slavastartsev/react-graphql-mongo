import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';

export default (initialState = {}) => {
  const logger = createLogger();
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger),
  );
};
