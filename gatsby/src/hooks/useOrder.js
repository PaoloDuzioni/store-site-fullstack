import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function useOrder({ pizzas, input }) {
    // Global order state
    const [order, setOrder] = useContext(OrderContext);

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
