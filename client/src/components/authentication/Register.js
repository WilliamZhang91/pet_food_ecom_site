import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";

export const Register = () => {

    const dispatch = useDispatch();

    const toggleRegisterModal = () => {
        dispatch(loginActions.toggleRegisterModal());
    };

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={toggleRegisterModal}></div>
            <div>
                <div className={styles.border}>
                    <div className={styles.login}>
                        <h1>REGISTER</h1>
                        <form className={styles.input}>
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="johndoe@email.com"
                            />
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Password"
                            />
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Confirm Password"
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