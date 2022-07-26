import { useState } from "react";
import { useLogin } from "./useLogin";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { checkName, checkEmail, checkPassword, checkConfirmPassword } from "./FormValidation";
import Axios from "axios";

export const useRegister = () => {

    const { handleLogin } = useLogin();

    const dispatch = useDispatch();

    const toggleRegisterModal = () => {
        dispatch(loginActions.toggleRegisterModal());
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState({ formError: false, message: "" });
    const [emailErrorMessage, setEmailErrorMessage] = useState({ formError: false, message: "" });
    const [passwordErrorMessage, setPasswordErrorMessage] = useState({ formError: false, message: "" });
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState({ formError: false, message: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const resetErrorMessage = () => {
        setEmailErrorMessage({ formError: false, message: "" });
        setPasswordErrorMessage({ formError: false, message: "" });
        setConfirmPasswordErrorMessage({ formError: false, message: "" });
    };

    const nameValidator = () => {
        if (checkName(name)) {
            return true;
        } else {
            setNameErrorMessage({
                formError: true,
                message: "Not a valid name",
            })
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
            setName("")
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setNameErrorMessage({ formError: false, message: "" });
            setEmailErrorMessage({ formError: false, message: "" });
            setPasswordErrorMessage({ formError: false, message: "" });
            setConfirmPasswordErrorMessage({ formError: false, message: "" });
            await Axios.post("http://localhost:4000/auth/signup", {
                name: name,
                email: email,
                password: password,
            })
                .then(res => {
                    console.log(res);
                    handleLogin(e, email, password);
                })
                .catch(err => {
                    console.log(err);
                    setErrorMessage("Sign up failed");
                })
        } else {
            console.log("failed");
        };
    };

    return {
        name,
        email,
        password,
        confirmPassword,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        toggleRegisterModal,
        confirmPassword, 
        setConfirmPassword,
        nameErrorMessage, 
        setNameErrorMessage,
        emailErrorMessage, 
        setEmailErrorMessage,
        passwordErrorMessage, 
        setPasswordErrorMessage,
        confirmPasswordErrorMessage,
        setConfirmPasswordErrorMessage,
        errorMessage, 
        setErrorMessage,
        handleRegister,
    }

}