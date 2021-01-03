import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import useForm from '../../hooks/useForm';
import useOrder from '../../hooks/useOrder';
import Img from 'gatsby-image';
import PizzaOrder from '../PizzaOrder';
import calculatePrice from '../../utils/calculatePrice';
import styles from './style.module.scss';

const OrderForm = () => {
    // Get all pizzas
    const { pizzas } = useStaticQuery(graphql`
        query {
            pizzas: allSanityPizza {
                nodes {
                    id
                    name
                    price
                    slug {
                        current
                    }
                    image {
                        asset {
                            fluid(maxWidth: 100, maxHeight: 100) {
                                ...GatsbySanityImageFluid
                            }
                        }
                    }
                }
            }
        }
    `);

    // Form input values state with custom hook
    const { values, updateValue } = useForm({
        // Defaults
        name: '',
        email: '',
    });

    const { order, addToOrder, removeFromOrder } = useOrder({
        pizzas: pizzas.nodes,
        inputs: values,
    });

    return (
        <form className={styles.siteForm}>
            <fieldset>
                <legend>Your infornations</legend>

                <div className={styles.formField}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name here"
                        value={values.name}
                        onChange={updateValue}
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your email here"
                        value={values.email}
                        onChange={updateValue}
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>Pizza menu</legend>
                {pizzas.nodes.map(pizza => (
                    <div
                        key={pizza.id}
                        className={`flex align-center mb-2 ${styles.pizzaWidget}`}
                    >
                        <figure className={styles.pizzaImage}>
                            <Img
                                fluid={pizza.image.asset.fluid}
                                alt={pizza.name}
                            />
                        </figure>
                        <div className={styles.pizzaInfos}>
                            <h3 className={styles.pizzaTitle}>{pizza.name}</h3>
                            <div>
                                {['Small', 'Medium', 'Large'].map(size => (
                                    <button
                                        key={size}
                                        className={`button small ${styles.pizzaButton}`}
                                        onClick={e =>
                                            addToOrder(e, {
                                                id: pizza.id,
                                                size,
                                            })
                                        }
                                    >
                                        <span>{size} </span>
                                        <span>
                                            {calculatePrice(pizza.price, size)}€
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </fieldset>

            <fieldset>
                <legend>Order</legend>
                <PizzaOrder
                    order={order}
                    removeFromOrder={removeFromOrder}
                    pizzas={pizzas.nodes}
                />
            </fieldset>

            <fieldset>
                <legend>Check Out</legend>
            </fieldset>
        </form>
    );
};

export default OrderForm;