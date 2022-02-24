import styles from "./Products.module.css";
import { ProductsPage } from "./ProductsPage";
import { useSelector } from "react-redux";

export const Products = () => {

    const { products } = useSelector(state => state.products);
    const { category } = useSelector(state => state.category);
    const filterProducts = products.filter(product => product.animal === category);
    const type = [...new Set(filterProducts.map(product => product.category))];
    const age = [...new Set(filterProducts.map(product => product.age))];
    const health = [...new Set(filterProducts.map(product => product.health_needs))];
    const brand = [...new Set(filterProducts.map(product => product.brand))];

    return <>
        <div className={styles.layout}>
            <div className={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)} Food</div>
            <div className={styles.filter}>
                <div>{type.map(el => {
                    return <div>{el.toUpperCase()}</div>
                })}</div>
                <div>{age.map(el => {
                    return <div>{el.toUpperCase()}</div>
                })}</div>
                <div>{health.map(el => {
                    return <div>{el.toUpperCase()}</div>
                })}</div>
                <div>{brand.map(el => {
                    return <div>{el.toUpperCase()}</div>
                })}</div>
            </div>
            <div className={styles.products}>
                {filterProducts ? filterProducts.map(product => {
                    return (
                        <div>
                            <div className={styles.product1}>
                                <ProductsPage key={product.product_id} {...product} />
                            </div>
                        </div>
                    )
                }) : <div>
                <div className={styles.product1}>
                    <h1>LOADING...</h1>
                </div>
            </div>}
            </div>
        </div>
    </>
};