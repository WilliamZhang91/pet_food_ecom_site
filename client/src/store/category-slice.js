import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: "",
    },
    reducers: {
        selectCategory(state, action) {
            state.category = action.payload.animal;
        },
    },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;