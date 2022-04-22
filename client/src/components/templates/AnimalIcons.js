import styles from "./AnimalIcons.module.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products-slice";
import { categoryActions } from "../../store/category-slice";

export const AnimalIcons = () => {

    const dispatch = useDispatch();
    const { category } = useSelector(state => state.category);
    console.log(category)

    const selectCategory = (e) => {
        dispatch(categoryActions.selectCategory({
            animal: e.target.attributes.getNamedItem("value").value
        }))
    };

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    return <>
        <div className={styles.animals}>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="dog"
                    name="dog"
                    value="dog"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="dogicon.png"
                        alt="dog"
                        value="dog"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="cat"
                    name="cat"
                    value="cat"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="caticon.png"
                        value="cat"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="bird"
                    name="bird"
                    value="bird"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="birdicon.png"
                        value="bird"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="rabbit"
                    name="rabbit"
                    value="rabbit"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="rabbiticon.png"
                        value="rabbit"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="fish"
                    name="fish"
                    value="fish"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="fishicon.png"
                        value="fish"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="turtle"
                    name="turtle"
                    value="turtle"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="turtleicon.png"
                        value="turtle"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
            <Link to={`products`} className={styles.link}>
                <button
                    className={styles.animal}
                    alt="horse"
                    name="horse"
                    value="horse"
                    onClick={(e) => selectCategory(e)}
                >
                    <img
                        className={styles.img}
                        src="horseicon.png"
                        value="horse"
                        onClick={(e) => selectCategory(e)}
                    />
                </button>
            </Link>
        </div>
    </>
}