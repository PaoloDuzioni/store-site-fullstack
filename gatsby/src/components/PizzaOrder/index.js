import React from 'react';
import Img from 'gatsby-image';
import calculatePrice from '../../utils/calculatePrice';
import styles from './style.module.scss';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => {
    return (
        <section>
            <p>You have {order.length} items in your order.</p>

            {order.map((singleOrder, index) => {
                const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);

                return (
                    <div key={singleOrder.id} className={styles.orderItem}>
                        <figure className={styles.itemImage}>
                            <Img fluid={pizza.image.asset.fluid} />
                        </figure>
                        <div className={styles.itemInfos}>
                            <h3 className={styles.itemTitle}>{pizza.name}</h3>
                            <div className={styles.itemPrice}>
                                {singleOrder.size} -{' '}
                                {calculatePrice(pizza.price, singleOrder.size)}€
                            </div>
                            <button
                                className={styles.itemRemove}
                                title={`Remove ${singleOrder.size} ${pizza.name} from order`}
                                onClick={() => removeFromOrder(index)}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default PizzaOrder;
