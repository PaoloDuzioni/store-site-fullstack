import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import useForm from '../../hooks/useForm';
import useOrder from '../../hooks/useOrder';
import Img from 'gatsby-image';
import PizzaOrder from '../PizzaOrder';
import calculatePrice from '../../utils/calculatePrice';
import styles from './style.module.scss';
import calculateTotale from '../../utils/calculateTotal';

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
        mapleSyrup: '',
    });

    const {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    } = useOrder({
        pizzas: pizzas.nodes,
        values,
    });

    if (message) {
        return <p className={styles.messageOk}>{message}</p>;
    }

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
                    <input
                        className={styles.mapleSyrup}
                        type="text"
                        name="mapleSyrup"
                        id="mapleSyrup"
                        placeholder="Maple syrup"
                        value={values.mapleSyrup}
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
                <legend>Order total</legend>
                <div className={styles.orderCheckout}>
                    <h3>
                        Your order total is{' '}
                        <strong>{calculateTotale(order, pizzas.nodes)}€</strong>
                    </h3>
                    <button
                        className={`button big ${styles.submitBtn}`}
                        disabled={loading}
                        onClick={submitOrder}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
                {error && <p className={styles.messageError}>{error}</p>}
            </fieldset>
        </form>
    );
};

export default OrderForm;
