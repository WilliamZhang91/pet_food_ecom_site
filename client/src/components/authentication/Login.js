import React, { useState, useEffect } from "react";
import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";
import Axios from "axios";

export const Login = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        incorrectPassword: false,
        message: "",
        passwordReset: "",
    });

    const toggleLoginModal = () => {
        dispatch(loginActions.toggleLoginModal())
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:4000/auth/login", {
            email: email,
            password: password,
        })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("info", JSON.stringify(res.data.response));
                dispatch(loginActions.verifyLoginHandler({
                    token: localStorage.getItem("token"),
                    info: localStorage.getItem("info"),
                }))
            }).catch(err => {
                console.log(err);
                setErrorMessage({
                    incorrectPassword: true,
                    message: "Incorrect Username/Password. Please try again.",
                    passwordReset: "Reset your password?"
                });
            });
    };

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
                        <form className={styles.input} onSubmit={handleLogin}>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="johndoe@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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