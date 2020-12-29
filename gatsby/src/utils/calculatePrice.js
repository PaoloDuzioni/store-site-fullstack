/**
 * Calculate the pizza price based on its size
 *
 * @param {number} price - Price standard of the pizza
 * @param {number} size - Size of the pizzas
 */
export default function calculatePrice(price, size) {
    if (size === 'Small') {
        price -= 0.25;
    } else if (size === 'Large') {
        price += 0.25;
    }

    return price.toFixed(2);
}
