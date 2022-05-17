import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        showChangePasswordModal: false,
        showChangeEmailModal: false,
        isLoggedIn: false,
        showLoginModal: false,
        showRegisterModal: false,
        token: localStorage.getItem("token"),
        info: localStorage.getItem("info"),
    },
    reducers: {
        toggleLoginModal(state) {
            state.showLoginModal = !state.showLoginModal;
        },
        toggleRegisterModal(state) {
            state.showRegisterModal = !state.showRegisterModal;
        },
        toggleChangePasswordModal(state) {
            state.showChangePasswordModal = !state.showChangePasswordModal;
        },
        toggleChangeEmailModal(state) {
            state.showChangeEmailModal =!state.showChangeEmailModal;
        },
        verifyLoginHandler(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.info = action.payload.info;
        },
    },
});

export const loginActions = loginSlice.actions;

export default loginSlice;