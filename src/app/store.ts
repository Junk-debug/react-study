import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/api";
import selectedCharactersReducer from "../redux/slices/selectedCharactersSlice";

const store = configureStore({
  reducer: {
    selectedCharacters: selectedCharactersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
