import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers/rootReducer';
import config from '../configs/constant';
import migrations from './migrations';

const persistConfig = {
  key: config.persistConfig.key,
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  pReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export const persistor = persistStore(store);
