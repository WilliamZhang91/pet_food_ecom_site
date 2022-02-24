import styles from "./Products.module.css";
import React, { useState } from "react"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = () => {

    //const id = useSelector(state => state.login);
    //const info = useSelector(state => state.login);
    const params = useParams();
    console.log(params);
    return <div className={styles.layout}>
        <div className={styles.title}>Profile</div>
        <h2>{params.id.replace(/\b\w/g, l => l.toUpperCase())}</h2>
    </div>
};