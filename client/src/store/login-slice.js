import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        showChangePasswordModal: false,
        showChangeEmailModal: false,
        isLoggedIn: false,
        showLoginModal: false,
        showRegisterModal: false,
        isAdmin: false,
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
        toggleLoginStatus(state) {
            state.isLoggedIn = true;
        },
        removeLoginStatus(state) {
            state.isLoggedIn = false;
        },
        toggleAdminStatus(state) {
            state.isAdmin = true;
        },
        removeAdminStatus(state) {
            state.isAdmin = false;
        },
        clearInfo(state) {
            state.info = "";
        },
        verifyLoginHandler(state, action) {
            state.info = action.payload.info;
        },
        logoutHandler(state) {
            state.isLoggedIn = false;
            state.showLoginModal = false;
            state.token = state.info = null;
        },
    },
});

export const loginActions = loginSlice.actions;

export default loginSlice;