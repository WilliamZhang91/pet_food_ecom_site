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
            return <div key={index}>
                <img src={item.image}></img>
                <div>{item.brand}</div>
                <div>{item.name}</div>
                <div>${item.price}.00</div>
            </div>
        })}
        </div>
    </>
}