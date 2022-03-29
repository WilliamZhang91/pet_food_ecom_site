import styles from "./IndividualProduct.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const IndividualProduct = () => {

    const params = useParams();
    const id = +params.product_id;
    const { products } = useSelector(state => state.products);
    const filter = products.filter(product => product.product_id === id);

    return <>
        <div>
            {filter.map((item, index) => {
                return <div>
                    <div className={styles.layout} key={index}>
                        <img className={styles.img} src={item.image}></img>
                        <div className={styles.description}>
                            <div>
                                <div className={styles.brand}>{item.brand}</div>
                                <div className={styles.name}>{item.name}</div>
                            </div>
                            <div className={styles.price}>${item.price}.00</div>
                            <button>Add to cart</button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </>
}