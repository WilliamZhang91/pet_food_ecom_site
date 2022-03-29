import styles from "./Products.module.css";
import React, { useState } from "react"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = () => {

    const loginDetails = useSelector(state => state.login.info);

    console.log(JSON.parse(loginDetails)[0].name);
    const params = useParams();
    console.log(params);
    //replace(/\b\w/g, l => l.toUpperCase())
    return <div className={styles.layout}>
        <div className={styles.title}>Profile</div>
        {loginDetails ?
            <div>
                <h2>{JSON.parse(loginDetails)[0].name.replace(/\b\w/g, l => l.toUpperCase())}</h2>
                <h3>{JSON.parse(loginDetails)[0].email}</h3>
            </div>
            :
<h2>Loading...</h2>}
    </div>
};