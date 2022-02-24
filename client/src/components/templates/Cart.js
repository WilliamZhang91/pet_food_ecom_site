import styles from "./Cart.module.css";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    console.log(cart)
    console.log(cart)

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
                            return <div key={cartItem.id}>
                                <img src={cartItem.image} className={styles.img} alt={cartItem.name}/>
                                <h2>{cartItem.name}</h2>
                                <h2>{cartItem.brand}</h2>
                                <h3>${cartItem.price * cartItem.quantity}.00</h3>
                                <h3>Quantity: {cartItem.quantity}</h3>
                            </div>
                        })}
                        {
                            cart.length > 0
                                ?
                                <p className={styles.total}>
                                    Total Price:
                                </p>
                                :
                                <p>Cart Empty</p>}
                        {
                            cart.length > 0
                                ?
                                <Link to="checkout">
                                    <button>
                                        Proceed to Checkout
                                    </button>
                                </Link>
                                :
                                null}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}