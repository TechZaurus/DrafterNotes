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
    setCategories(state, action: PayloadAction<Categories>) {
        state.categories = action.payload.categories;
    }
  } 
})

export const { setCategories } = categoriesSlice.actions;


export default categoriesSlice.reducer 