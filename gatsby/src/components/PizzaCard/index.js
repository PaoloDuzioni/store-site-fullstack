import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from './style.module.scss';

const PizzaCard = ({ details }) => {
    return (
        <li className={styles.pizzaContainer}>
            <Link to={`/pizza/${details.slug.current}`}>
                <figure className={styles.pizzaImage}>
                    <Img fixed={details.image.asset.fixed} alt={details.name} />
                </figure>
                <h2 className={styles.pizzaTitle}>{details.name}</h2>
                <div>
                    {details.toppings.map(topping => topping.name).join(', ')}
                </div>
                <div className={styles.pizzaPrice}>
                    {details.price.toFixed(2)}€
                </div>
            </Link>
        </li>
    );
};

export default PizzaCard;
