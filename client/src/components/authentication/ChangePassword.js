import React, { useState } from "react";
import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";
import Axios from "axios";

export const ChangePassword = () => {

    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const toggleChangePasswordModal = () => {
        dispatch(loginActions.toggleChangePasswordModal());
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        await Axios.put("http://localhost:4000/auth/reset_password", {
            current_password: currentPassword,
            new_password: newPassword,
        })
            .then(res => {
                console.log(res);
                setMessage("Password has been changed");
                setCurrentPassword("");
                setNewPassword("");
            })
            .catch(err => {
                console.log(err);
                setMessage("Incorrect password");
                setCurrentPassword("");
                setNewPassword("");
            });
    };

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={toggleChangePasswordModal}></div>
            <div>
                <div className={styles.border} onSubmit={handleChangePassword}>
                    <div className={styles.login}>
                        <h1>Change Password</h1>
                        <form className={styles.input}>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Current password"
                                name="current_password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="New password"
                                name="new_password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button>SUBMIT</button>
                        </form>
                        <div>{message}</div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};