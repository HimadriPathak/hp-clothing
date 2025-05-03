import { applyMiddleware, compose, createStore, Middleware } from "redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//REVIEW - middleWare used for thunk
// const middleWares = [
//   process.env.NODE_ENV !== "production" && logger,
//   thunk,
// ].filter(Boolean);

//NOTE - this is a curry function (function which returns another function) we can create our own logger below is an example
//LINK - custom middleware in store/middleware/logger.ts

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  //   blacklist: ["user"],
  whitelist: ["cart"],
};
//REVIEW - middleWare used for saga
const sagaMiddleware = createSagaMiddleware();
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
