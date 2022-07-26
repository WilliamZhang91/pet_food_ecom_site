import styles from "./Home.module.css"
import loginReducer from "../../store/login-slice"

export const Home = () => {

    return <div className={styles.margin}>
        <div className={styles.home}>
            <img className={styles.img} src="./home_page_dog.png" />
            <img className={styles.img} src="./home_page_cat.png"/>
        </div>
        <div className={styles.home}>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
        </div>
    </div>
}