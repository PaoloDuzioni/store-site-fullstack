import { useState } from 'react';

export default function useOrder({ pizzas, input }) {
    // Order state
    const [order, setOrder] = useState([]);

    // Add items to order
    function addToOrder(event, orderedPizza) {
        event.preventDefault();
        setOrder([...order, orderedPizza]);
    }

    // Remove items to order
    function removeFromOrder(event, index) {
        event.preventDefault();

        setOrder([
            // Items before the index
            ...order.slice(0, index),
            // items after the index
            ...order.slice(index + 1),
        ]);
    }

    // TODO: send data to serverless function to checkout

    return {
        order,
        addToOrder,
        removeFromOrder,
    };
}
