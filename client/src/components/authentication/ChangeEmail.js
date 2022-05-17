import styles from "../templates/Cart.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";

export const ChangeEmail = () => {

    const dispatch = useDispatch();

    const toggleChangeEmailModal = () => {
        dispatch(loginActions.toggleChangeEmailModal());
    };

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={toggleChangeEmailModal}></div>
            <div>
                <div className={styles.border}>
                    <div className={styles.login}>
                        <h1>Change Email</h1>
                        <form className={styles.input}>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Current password"
                            />
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="New Email"
                            />
                            <button>SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};