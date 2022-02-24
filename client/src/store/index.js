import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice";
import categorySlice from "./category-slice";
import cartSlice from "./cart-slice";
import loginSlice from "./login-slice";

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        category: categorySlice.reducer,
        cart: cartSlice.reducer,
        login: loginSlice.reducer,
    }
});

export default store;