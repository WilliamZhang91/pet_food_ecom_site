import React, { useState, useEffect } from "react";
import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useLogin } from "./useLogin";
import { useSelector } from "react-redux";

export const Login = () => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        setErrorMessage,
        handleLogin,
        toggleLoginModal
    } = useLogin();

    useEffect(() => {
        handleLogin();
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={toggleLoginModal}></div>
            <div>
                <div className={styles.border}>
                    <div className={styles.login}>
                        <h1>LOGIN</h1>
                        <form
                            className={styles.input}
                            onSubmit={(e) => handleLogin(e, email, password)}
                        >
                            <div>
                                <input
                                    className={styles.input}
                                    type="email"
                                    name="email"
                                    placeholder="johndoe@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    className={styles.input}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button>SUBMIT</button>
                        </form>
                        {
                            errorMessage.incorrectPassword
                                ?
                                <div>
                                    <div>
                                        {errorMessage.message}
                                    </div>
                                    <div>
                                        {errorMessage.passwordReset}
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}