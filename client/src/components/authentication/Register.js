import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useRegister } from "./useRegister";

export const Register = () => {

    const {
        name, 
        email,
        password,
        confirmPassword,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        toggleRegisterModal,
        nameErrorMessage,
        emailErrorMessage,
        passwordErrorMessage,
        confirmPasswordErrorMessage,
        errorMessage,
        setErrorMessage,
        handleRegister,
    } = useRegister();


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
                                    placeholder="Whats your name?"
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