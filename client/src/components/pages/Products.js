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

    const selectFilter = (e) => {
        console.log(e.target.attributes.getNamedItem("id").value)
    }

    return <>
        <div className={styles.layout}>
            <div className={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)} Food</div>
            <div className={styles.filter}>
                <div>{type.map((el, index) => {
                    return (
                        <button
                            id={el}
                            key={index}
                            onClick={(e) => selectFilter(e)}
                            value={el}
                            className={styles.filterButton}
                        >
                            {el.toUpperCase()}
                        </button>)
                })}</div>
                <div>{age.map((el, index)=> {
                    return (
                        <button
                            id={el}
                            key={index}
                            onClick={(e) => selectFilter(e)}
                            value={el}
                            className={styles.filterButton}
                        >{el.toUpperCase()}
                        </button>)
                })}</div>
                <div>{health.map((el, index) => {
                    return (
                        <button
                            id={el}
                            key={index}
                            onClick={(e) => selectFilter(e)}
                            value={el}
                            className={styles.filterButton}
                        >
                            {el.toUpperCase()}
                        </button>)
                })}</div>
                <div>{brand.map((el, index) => {
                    return (
                        <button
                            id={el}
                            key={index}
                            onClick={(e) => selectFilter(e)}
                            value={el}
                            className={styles.filterButton}
                        >
                            {el.toUpperCase()}
                        </button>
                    )
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