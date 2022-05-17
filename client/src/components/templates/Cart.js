import styles from "./Cart.module.css";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn)
    console.log(isLoggedIn)
    let price = [];
    let totalPrice = null
    price = cart.map((item) => item.price * item.quantity);
    totalPrice = price.reduce((prevAmount, currentAmount) => {
        return prevAmount + currentAmount
    }, []);
    const toggleCart = () => {
        dispatch(cartActions.toggleCart());
    };

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={toggleCart}></div>
            <div>
                <div className={styles.border}>
                    <div>
                        <h1>YOUR CART</h1>
                        {cart.map(cartItem => {
                            const removeItemFromCart = () => {
                                dispatch(cartActions.removeItemFromCart({
                                    product_id: cartItem.id
                                }));
                            };
                            const addItemToCart = () => {
                                dispatch(cartActions.addItemToCart({
                                    product_id: cartItem.id,
                                    brand: cartItem.brand,
                                    name: cartItem.name,
                                    price: cartItem.price,
                                    image: cartItem.image,
                                }));
                            }
                            return <div key={cartItem.id}>
                                <img
                                    src={cartItem.image}
                                    className={styles.img}
                                    alt={cartItem.name}
                                />
                                <h3>{cartItem.name}</h3>
                                <h3>{cartItem.brand}</h3>
                                <h3>${totalPrice}.00</h3>
                                <h3>Quantity: {cartItem.quantity}</h3>
                                <div className={styles.operatorButton}>
                                    <button onClick={removeItemFromCart}>-</button>
                                    <button onClick={addItemToCart}>+</button>
                                </div>
                                <button className={styles.removeButton}>Remove</button>
                            </div>
                        })}
                        {
                            cart.length > 0
                                ?
                                <>
                                    <Link to="/checkout">
                                        <button>
                                            Proceed to Checkout
                                        </button>
                                    </Link>
                                    <p className={styles.total}>
                                        Total Price: ${totalPrice}.00
                                    </p>
                                </>
                                :
                                <p>Cart Empty</p>
                        }
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};