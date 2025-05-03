// import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";

import { configureStore } from "@reduxjs/toolkit";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

// //NOTE - this is a curry function (function which returns another function) we can create our own logger below is an example
// // const loggerMiddleware = (store) => (next) => (action) => {
// //   if (!action.type) return next(action);
// //   console.log("type: ", action.type);
// //   console.log("payload: ", action.payload);
// //   console.log("currentState: ", store.getState());

// //   next(action);

// //   console.log("next state: ", store.getState());
// // };

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["user"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;
// const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));
// export const store = createStore(persistedReducer, undefined, composeEnhancers);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
    }).concat(middleWares),
});
// export const persistor = persistStore(store);
