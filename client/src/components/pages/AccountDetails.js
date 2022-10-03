import React from "react";
import styles from "./Products.module.css";
import { loginActions } from "../../store/login-slice";
import { useDispatch } from "react-redux";

export const AccountDetails = () => {

    const dispatch = useDispatch();
    const toggleChangePasswordModal = () => {
        dispatch(loginActions.toggleChangePasswordModal());
    };
    const toggleChangeEmailModal = () => {
        dispatch(loginActions.toggleChangeEmailModal());
    };

    return <>
        <div className={styles.layout}>
            <h1>Account Settings</h1>
            <div className={styles.account_settings}>
                <p>Email Address</p>
                <button onClick={toggleChangeEmailModal}>Change</button>
            </div>
            <div className={styles.account_settings}>
                <p>Change Password</p>
                <button onClick={toggleChangePasswordModal}>Change</button>
            </div>
        </div>
    </>
}