import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface CategoriesState {
    data: Categories;
}


export interface Categories {
    categories: Array<string>;
}


const initialState: Categories = {
    categories: []
}


export const categoriesSlice = createSlice({
  name: "categories", 
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<void>) {
        state.categories = ["Категория 1", "Категория 2", "Категория 3"];
    }
  } 
})

export const { setCategories } = categoriesSlice.actions;


export default categoriesSlice.reducer 