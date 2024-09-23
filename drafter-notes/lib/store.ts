import { configureStore } from "@reduxjs/toolkit"
import notesReducer from "./features/notes/notesSlice"
import categoriesReducer from "./features/notes/categoriesSlice"
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { 
    notes: notesReducer,
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();