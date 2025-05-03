//NOTE - this is a curry function (function which returns another function) we can create our own logger below is an example

// export const loggerMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     if (!action.type) {
//       return next(action);
//     }

//     console.log("type: ", action.type);
//     console.log("payload: ", action.payload);
//     console.log("currentState: ", store.getState());

//     const result = next(action);

//     console.log("next state: ", store.getState());

//     return result;
//   };
export const logger = () => console.log("logger");
