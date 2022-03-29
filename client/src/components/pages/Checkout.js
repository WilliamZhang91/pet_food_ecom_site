import { useSelector } from "react-redux";
import Axios from "axios";
import styles from "./Products.module.css"

export const Checkout = () => {

    const cart = useSelector(state => state.cart.cart);
    console.log(cart);
    const info = useSelector(state => state.login);
    const credentials = JSON.parse(info.info);
    console.log(credentials);
    const customer_id = credentials.map(cred => cred.id)
    console.log(customer_id);
    const product_id = cart.map(item => item.id)
    console.log(cart.id);
    console.log(product_id);
    const quantity = cart.map(item => item.quantity);
    console.log(quantity);

    const postPurchase = () => {
        Axios.post("http://localhost:4000/purch/cart", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            customer_id: 1,
            product_id: cart,
            quantity: cart
        })
            .then(res => {
                console.log(res);
                //const array = JSON.parse(res.config.data).detail
            })
            .catch(err => console.log(err));
    };

    return <div className={styles.layout}>
        <h1 className={styles.title}>Checkout</h1>
        {cart.map((item, index) => {
            return <div key={index}>
                <div className={styles.flex}>
                    <div>
                        <img src={item.image} alt={item.name} className={styles.image} />
                    </div>
                    <div className={styles.category}>
                        <h2>{item.name}</h2>
                        <h3>{item.brand}</h3>
                        <p>Price: ${item.price}.00</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total Price: {item.price * item.quantity}.00</p>
                    </div>
                </div>
            </div>
        })}
        <button onClick={postPurchase}>Confirm</button>
    </div>
}