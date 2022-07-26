import styles from "./Header.module.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { cartActions } from "../../store/cart-slice";
import { loginActions } from "../../store/login-slice";
import { useHandleScroll } from "./useHandleScroll";

export const Header = () => {

    const { scrollRef } = useHandleScroll();
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.cart.showCart);
    const { login } = useSelector(state => state)
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState(prevState => {
        if (localStorage.getItem("token") === null || !localStorage.getItem("token")) {
            return prevState
        } else {
            console.log(JSON.parse(localStorage.getItem("info"))[0].name)
            return prevState = JSON.parse(localStorage.getItem("info"))[0].name
        };
    });

    const toggleCart = () => {
        dispatch(cartActions.toggleCart());
    };

    const toggleRegisterModal = () => {
        dispatch(loginActions.toggleRegisterModal());
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
        console.log(login);
    };

    const toggleLoginModal = () => {
        dispatch(loginActions.toggleLoginModal());
    }

    useEffect(() => {
        setCredentials
    }, []);

    useEffect(() => {
        if (showCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        };
    }, [showCart, toggleCart]);

    return <>
        <div className={styles.header} ref={scrollRef}>
            <div className={styles.header1}>
                <div>
                    <Link to="/">
                        <img src="pet.png" className={styles.logo} alt="logo" />
                    </Link>
                </div>
                <div className={styles.position}>
                    <div>
                        <AiOutlineShoppingCart
                            className={styles.cart}
                            onClick={toggleCart}
                        />
                        {
                            localStorage.getItem("info") !== null ?
                                <Link to={`profile/${credentials}`}>
                                    <button>PROFILE</button>
                                </Link>
                                :
                                <button onClick={toggleLoginModal}>
                                    Log In
                                </button>
                        }
                        {
                            localStorage.getItem("info") !== null ?
                                <button className={styles.button} onClick={logout}>
                                    LOG OUT
                                </button>
                                :
                                <button className={styles.button} onClick={toggleRegisterModal}>
                                    REGISTER
                                </button>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.header2}>
                <img className={styles.img} src="puppy.png"></img>
                <div className={styles.title}>
                    <p className={styles.heading_font}>Anything and Everything your pet needs</p>
                    <input type="search" className={styles.search}></input>
                </div>
            </div>
        </div>
    </>
}