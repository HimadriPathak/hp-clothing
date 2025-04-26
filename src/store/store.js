import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

//REVIEW - middleWare used for thunk
// const middleWares = [
//   process.env.NODE_ENV !== "production" && logger,
//   thunk,
// ].filter(Boolean);

//NOTE - this is a curry function (function which returns another function) we can create our own logger below is an example
// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) return next(action);
//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };

const persistConfig = {
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
].filter(Boolean);
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
