import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const useLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        incorrectPassword: false,
        message: "",
        passwordReset: "",
    });

    const [credentials, setCredentials] = useState(prevState => {
        if (localStorage.getItem("token") === null) {
            return prevState
        } else {
            return prevState = JSON.parse(localStorage.getItem("info"))[0].name
        };
    });

    const toggleLoginModal = () => {
        dispatch(loginActions.toggleLoginModal())
    };

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        await Axios.post("http://localhost:4000/auth/login", {
            email: email,
            password: password,
        })
            .then(res => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("info", JSON.stringify(res.data.response));
                dispatch(loginActions.verifyLoginHandler({
                    token: localStorage.getItem("token"),
                    info: localStorage.getItem("info"),
                }));
                toggleLoginModal();
                navigate(`/profile/${credentials}`)
            }).catch(err => {
                console.log(err);
                setErrorMessage({
                    incorrectPassword: true,
                    message: "Incorrect Username/Password. Please try again.",
                    passwordReset: "Reset your password?"
                });
            });
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        setErrorMessage,
        toggleLoginModal,
        handleLogin,
    };

};