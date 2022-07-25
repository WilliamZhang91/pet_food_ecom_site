import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import loginReducer from "./store/login-slice";
import cartReducer from "./store/cart-slice";
import categoryReducer from "./store/category-slice";
import productsReducer from "./store/products-slice";
import { BrowserRouter } from "react-router-dom";

const reducer = (ui, {
    preloadedState,
    store = configureStore({
        reducer: { 
            login: loginReducer,
            cart: cartReducer,
            category: categoryReducer,
            products: productsReducer,
        },
        preloadedState
    }),
    ...renderOptions
} = {}
) => {
    const wrapper = ({ children }) => {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        )
    }
    return rtlRender(ui, { wrapper: wrapper, ...renderOptions })
};

export * from "@testing-library/react";
export { reducer }