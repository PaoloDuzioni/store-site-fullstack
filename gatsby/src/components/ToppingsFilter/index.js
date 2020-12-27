import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styles from './style.module.scss';

const ToppingsFilter = ({ activeTopping }) => {
    // get list of toppings and pizzas toppings
    const { pizzas } = useStaticQuery(graphql`
        query {
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `);

    // get toppings with number of pizzas per topping
    function countPizzasOnToppings(pizzas) {
        // return the pizzas with count
        const count = pizzas
            .map(pizza => pizza.toppings)
            .flat()
            .reduce((acc, topping) => {
                const existingTopping = acc[topping.id];

                // Check if existing topping
                if (existingTopping) {
                    existingTopping.count += 1;
                } else {
                    // if not, create new one
                    acc[topping.id] = {
                        ...topping,
                        count: 1,
                    };
                }

                return acc;
            }, {});

        const sortedToppings = Object.values(count).sort(
            (a, b) => b.count - a.count
        );

        return sortedToppings;
    }
    const toppingsWithCounts = countPizzasOnToppings(pizzas.nodes);

    // rendering
    return (
        <section>
            <h4 className={styles.sectionTitle}>
                Toppings Filter{activeTopping ? `: ${activeTopping}` : ''}
            </h4>
            <div className={styles.filterList}>
                <Link className={styles.filterItem} to="/pizzas">
                    <span className={styles.filterName}>All</span>
                    <span className={styles.filterCount}>
                        {pizzas.nodes.length}
                    </span>
                </Link>
                {toppingsWithCounts.map(topping => (
                    <Link
                        className={styles.filterItem}
                        key={topping.id}
                        to={`/topping/${topping.name}`}
                    >
                        <span className={styles.filterName}>
                            {topping.name}
                        </span>
                        <span className={styles.filterCount}>
                            {topping.count}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ToppingsFilter;
