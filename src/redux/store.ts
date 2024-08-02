import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedCharactersReducer from "./slices/selectedCharactersSlice";

const rootReducer = combineReducers({
  selectedCharacters: selectedCharactersReducer,
});

export const setupStore = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const store = setupStore();

export default store;
