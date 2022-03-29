import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        totalQuantity: 0,
        showCart: false,
    },
    reducers: {
        addItemToCart(state, action) {
            const existingCartItem = state.cart.find(item => item.id === action.payload.product_id);
            state.totalQuantity++;
            if (!existingCartItem) {
                state.cart.push({
                    id: action.payload.product_id,
                    brand: action.payload.brand,
                    name: action.payload.name,
                    price: action.payload.price,
                    image: action.payload.image,
                    quantity: 1,
                });
            } else {
                existingCartItem.quantity++;
            }
        },
        removeItemFromCart(state, action) {
            const existingCartItem = state.cart.find(item => item.id === action.payload.product_id);
            state.totalQuantity--;
            if (existingCartItem.quantity === 1) {
                state.cart = state.cart.filter(item => item.id !== action.payload.product_id);
            } else {
                existingCartItem.quantity--;
                existingCartItem.totalPrice = existingCartItem.totalPrice - existingCartItem.price;
            }
        },
        removeAllFromCart(state, action) {

        },
        clearCart(state, action) {

        },
        toggleCart(state) {
            state.showCart = !state.showCart
        },
    }
});

export const cartActions = cartSlice.actions

export default cartSlice;