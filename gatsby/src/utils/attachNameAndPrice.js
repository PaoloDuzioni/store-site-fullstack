import calculatePrice from './calculatePrice';

export default function attachNameAndPrice(order, pizzas) {
    return order.map(item => {
        const pizza = pizzas.find(pizza => pizza.id === item.id);

        return {
            ...item,
            name: pizza.name,
            thumbnail: pizza.image.asset.fluid.src,
            price: calculatePrice(pizza.price, item.size),
        };
    });
}
