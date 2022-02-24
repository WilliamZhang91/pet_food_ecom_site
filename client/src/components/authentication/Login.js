import React, { useState } from "react";
import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";
import Axios from "axios";


export const Login = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleLoginModal = () => {
        dispatch(loginActions.toggleLoginModal())
    };

    //console.log(process.env.REACT_APP_URL)

    const handleLogin = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/auth/login", {
            email: email,
            password: password,
        })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("info", JSON.stringify(res.data.response));
                dispatch(loginActions.verifyLoginHandler({
                    token: res.data.token,
                    info: res.data.response,
                }))
            }).catch(err => console.log(err))
    };

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
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}