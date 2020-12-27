import React from 'react';
import PizzaCard from '../PizzaCard';
import styles from './style.module.scss';

const PizzaList = ({ pizzas }) => {
    return (
        <div>
            <h4 className={styles.pizzaListTitle}>
                There are actually {pizzas.length} pizzas! Pick your fav:
            </h4>

            <ul className={styles.pizzaList}>
                {pizzas.map(pizza => (
                    <PizzaCard key={pizza.id} details={pizza} />
                ))}
            </ul>
        </div>
    );
};

export default PizzaList;
