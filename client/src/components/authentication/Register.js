import React, { useState } from "react";
import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { checkName, checkEmail, checkPassword, checkConfirmPassword } from "./FormValidation";
import Axios from "axios";

export const Register = () => {

    const dispatch = useDispatch();

    const toggleRegisterModal = () => {
        dispatch(loginActions.toggleRegisterModal());
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState({ formError: false, message: "" });
    const [nameErrorMessage, setNameErrorMessage] = useState({ formError: false, message: "" });
    const [passwordErrorMessage, setPasswordErrorMessage] = useState({ formError: false, message: "" });
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState({ formError: false, message: "" });

    const resetErrorMessage = () => {
        setEmailErrorMessage({ formError: false, message: "" });
        setNameErrorMessage({ formError: false, message: "" });
        setPasswordErrorMessage({ formError: false, message: "" });
        setConfirmPasswordErrorMessage({ formError: false, message: "" });
    };

    const nameValidator = () => {
        if (checkName(name)) {
            return true
        } else {
            setNameErrorMessage({
                formError: true,
                message: "Username must be 3 or more characters in length and only include numbers and letters"
            });
            return false;
        };
    };

    const emailValidator = () => {
        if (checkEmail(email)) {
            return true
        } else {
            setEmailErrorMessage({
                formError: true,
                message: "Not a valid email"
            });
            return false;
        };
    };

    const passwordValidator = () => {
        if (checkPassword(password)) {
            return true
        } else {
            setPasswordErrorMessage({
                formError: true,
                message: "Not a valid password"
            });
            return false;
        };
    };

    const confirmPasswordValidator = () => {
        if (checkConfirmPassword(password)) {
            return true
        } else {
            setConfirmPasswordErrorMessage({
                formError: true,
                message: "Passwords do not match"
            });
            return false;
        };
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        resetErrorMessage();
        if (nameValidator() && emailValidator() && passwordValidator() && confirmPasswordValidator()) {
            console.log("passed")
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            e.preventDefault();
            //await Axios.post("http://localhost:4000/auth/signup", {
            //    email: email,
            //    password: password,
            //})
            //    .then(res => {
            //        
            //    })
        } else {
            console.log("failed")
        }
    }

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={toggleRegisterModal}></div>
            <div>
                <div className={styles.border}>
                    <div className={styles.login}>
                        <h1>REGISTER</h1>
                        <form className={styles.input} onSubmit={handleRegister}>
                            <div>
                                <input
                                    className={styles.input}
                                    name="name"
                                    type="text"
                                    placeholder="Username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div style={{ fontSize: "12px" }}>
                                    {nameErrorMessage.message}
                                </div>
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    name="email"
                                    type="email"
                                    placeholder="johndoe@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div style={{ fontSize: "12px" }}>
                                    {emailErrorMessage.message}
                                </div>
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div style={{ fontSize: "12px" }}>
                                    {passwordErrorMessage.message}
                                </div>
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div style={{ fontSize: "12px" }}>
                                    {confirmPasswordErrorMessage.message}
                                </div>
                            </div>
                            <button>SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};