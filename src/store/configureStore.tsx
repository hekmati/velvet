import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import history from './history';

const configureStore = (state = {}) => {
  const store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunk, logger, routerMiddleware(history))),
  );

  // We can hook to webpack's API to replace the root reducer of the store, which will propagate back all the actions.
  const moduleAsAny = module as any;
  if (moduleAsAny.hot) {
    moduleAsAny.hot.accept('../reducers/rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export { configureStore };
