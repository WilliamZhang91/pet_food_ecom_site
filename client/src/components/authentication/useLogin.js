import { useState, useEffect } from "react";
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

    const credentials = useSelector(state => {
        return localStorage.getItem("info") && JSON.parse(state.login.info)[0].name
    });

    const toggleLoginModal = () => {
        dispatch(loginActions.toggleLoginModal());
    };

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        return await Axios.post("http://localhost:4000/auth/login",
            { email, password },
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } },
            { withCredentials: true })
            .then(res => {
                localStorage.setItem("info", JSON.stringify(res.data.array));

                dispatch(loginActions.verifyLoginHandler({
                    info: localStorage.getItem("info"),
                }));

                dispatch(loginActions.toggleLoginStatus());

                toggleLoginModal();

                navigate(`/profile/${credentials}`);

            }).catch(err => {

                console.log("error at handleLogin");

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