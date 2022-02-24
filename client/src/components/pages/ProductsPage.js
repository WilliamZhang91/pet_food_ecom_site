import styles from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

export const ProductsPage = (props) => {

    const dispatch = useDispatch();

    const { product_id, brand, name, price, image } = props;
    const { category } = useSelector(state => state.category);

    const addItemToCart = () => {
        console.log(product_id)
        dispatch(cartActions.addItemToCart({
            product_id: product_id,
            brand: brand,
            name: name,
            price: price,
            image: image,
        }));
    };

    return <div>
        <Link to={`${category}/${product_id}`}>
            <img className={styles.image} alt="product" src={image} />
        </Link>
        <div className={styles.product2}>
            <div className={styles.price}>${price}.00</div>
            <button onClick={addItemToCart}>Add to Cart</button>
        </div>
    </div>
}