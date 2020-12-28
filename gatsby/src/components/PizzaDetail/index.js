import React from 'react';
import Img from 'gatsby-image';
import BackLink from '../BackLink';
import styles from './style.module.scss';

const PizzaDetail = ({ pizza }) => {
    return (
        <div className={styles.pizzaDetail}>
            <figure className={styles.pizzaImage}>
                <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            </figure>

            <div className={styles.pizzaContents}>
                <BackLink dest="/pizzas" pos={{ type: 'absolute', y: 0, x: 0 }}>
                    Pizza Menu
                </BackLink>

                <div className={styles.contentsWrapper}>
                    <h1 className={styles.pizzaTitle}>{pizza.name}</h1>

                    <div className={styles.pizzaPrice}>
                        {pizza.price.toFixed(2)}€
                    </div>

                    <h3 className={styles.pizzaSubtitle}>
                        <span>Toppings</span>
                    </h3>
                    <ul className={styles.pizzaList}>
                        {pizza.toppings.map(topping => (
                            <li key={topping.id}>{topping.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PizzaDetail;
