import React from 'react';
import Pizza from '../Pizza';

const PizzaList = ({ pizzas }) => {
    return (
        <div>
            <h4>There are actually {pizzas.length} pizzas!!</h4>

            <ul>
                {pizzas.map(pizza => (
                    <Pizza key={pizza.id} details={pizza} />
                ))}
            </ul>
        </div>
    );
};

export default PizzaList;
