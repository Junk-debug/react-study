import { useDispatch, useSelector, useStore } from "react-redux";
import type store from "../app/store";

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppStore = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
