import { useContext, useState } from 'react';
import axios from 'axios';
import OrderContext from '../components/OrderContext';
import calculateTotale from '../utils/calculateTotal';
import attachNameAndPrice from '../utils/attachNameAndPrice';

export default function useOrder({ pizzas, values }) {
    // Get global order state
    const [order, setOrder] = useContext(OrderContext);

    // Local state
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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

    // Submit order
    async function submitOrder(e) {
        e.preventDefault();

        // Reset to start the new call
        setLoading(true);
        setError(null);
        setMessage(null);

        // Data to send at the serverless function
        const body = {
            order: attachNameAndPrice(order, pizzas),
            total: calculateTotale(order, pizzas),
            name: values.name,
            email: values.email,
            mapleSyrup: values.mapleSyrup,
        };

        // Call serverless function to send email (POST)
        try {
            const response = await axios.post(
                `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
                {
                    body: body,
                }
            );

            setLoading(false);
            setMessage(response.data.message);
        } catch (error) {
            //console.error(error.response);
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return {
        order,
        addToOrder,
        removeFromOrder,
        submitOrder,
        error,
        loading,
        message,
    };
}
