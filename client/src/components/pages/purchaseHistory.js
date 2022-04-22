import React from "react";
import styles from "./purchaseHistory.module.css";

export const PurchaseHistory = ({
    product_id,
    date,
    time,
    quantity,
    animal,
    brand,
    category,
    image,
    name,
    price,
    health_needs,
}) => {
    return (
        <React.Fragment>
            <div className={styles.layout}>
                <img className={styles.img} src={image} />
                <div>                
                    <h1>{brand}</h1>
                    <h2>{name}</h2>
                    <h2>{category}</h2>
                    <h2>{health_needs}</h2>
                    <h3>${price}.00</h3>
                </div>
            </div>
        </React.Fragment>
    );
};