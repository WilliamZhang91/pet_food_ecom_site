import Axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, {useEffect} from "react"

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        return await Axios.get("http://localhost:4000/dog")
            .then(response => {
                return response.data
            })
            .catch(err => {
                console.log(err)
            })
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: null,
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = "loading"
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.status = "success"
        },
        [getProducts.rejected]: (state) => {
            state.status = "failed"
        }
    },
});

export const productsActions = productsSlice.actions;

export default productsSlice






