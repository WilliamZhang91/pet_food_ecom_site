import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoggedIn: false,
        showLoginModal: false,
        showRegisterModal: false,
        token: localStorage.getItem("token"),
        info: localStorage.getItem("info"),
    },
    reducers: {
        toggleLoginModal(state) {
            state.showLoginModal = !state.showLoginModal
        },
        toggleRegisterModal(state) {
            state.showRegisterModal = !state.showRegisterModal
        },
        verifyLoginHandler(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.info = action.payload.info;
        },
        logout(state) {
            state.token = "";
            state.info = ""
        }
    },
});

export const loginActions = loginSlice.actions;

export default loginSlice;