import calculatePrice from './calculatePrice';

export default function calculateTotale(order, pizzas) {
    // loop over order items and calculate price total
    const total = order.reduce((runningTotal, item) => {
        const pizza = pizzas.find(pizza => pizza.id === item.id);
        return runningTotal + calculatePrice(pizza.price, item.size);
    }, 0);

    return total.toFixed(2);
}
