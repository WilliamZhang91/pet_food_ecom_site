import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import { PurchaseHistory } from "./purchaseHistory";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHandleScroll } from "../templates/useHandleScroll";
import Axios from "axios";

export const Profile = () => {

    const loginDetails = useSelector(state => state.login);
    const isAdmin = JSON.parse((loginDetails.isAdmin));
    console.log(isAdmin)
    console.log(JSON.parse(loginDetails.info)[0].role_id);
    const [purchaseHistory, setPurhcaseHistory] = useState([]);
    const credentials = JSON.parse(loginDetails.info);
    //console.log(credentials[0].customer_id)

    const getPurchaseHistory = async () => {
        await Axios.post("http://localhost:4000/purch/purchases", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            customer_id: credentials[0].customer_id,
        })
            .then(res => {
                setPurhcaseHistory(res.data)
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getPurchaseHistory();
    }, []);

    console.log(purchaseHistory)

    //console.log(JSON.parse(loginDetails.info)[0].name);
    const params = useParams();
    //console.log(params);
    //replace(/\b\w/g, l => l.toUpperCase())
    return <div className={styles.layout}>
        <div className={styles.title}>Profile</div>
        {loginDetails ?
            <div className={styles.customer}>
                <h2>{JSON.parse(loginDetails.info)[0].name.replace(/\b\w/g, l => l.toUpperCase())}</h2>
                <h3>{JSON.parse(loginDetails.info)[0].email}</h3>
                <div>
                    <Link to="/account-details">
                        <button style={{ margin: "0 0px", fontSize: "25px" }}>Manage Account</button>
                    </Link>
                    {
                        JSON.parse(loginDetails.info)[0].role_id === 2 ?
                            <Link to={`/profile/${credentials[0].name}/dashboard`}>
                                <button style={{ margin: "0 20px", fontSize: "25px" }}>Dashboard</button>
                            </Link>
                            :
                            null
                    }
                </div>
                <div className={styles.flex}>
                    <h1 className={styles.title} style={{ width: "100%" }}>Purchase History</h1>
                    {purchaseHistory && purchaseHistory.map((item, index) => {
                        const {
                            product_id,
                            date, time,
                            quantity,
                            animal,
                            brand,
                            category,
                            image,
                            name,
                            price,
                            health_needs
                        } = item
                        return <PurchaseHistory
                            key={index}
                            product_id={product_id}
                            date={date}
                            time={time}
                            quantity={quantity}
                            animal={animal}
                            brand={brand}
                            category={category}
                            image={image}
                            name={name}
                            price={price}
                            health_needs={health_needs}
                            className={styles.flex}
                        />
                    })}
                </div>
            </div>
            :
            <h2>Loading...</h2>}
    </div>
};