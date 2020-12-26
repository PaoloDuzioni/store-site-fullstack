import PriceInput from '../components/PriceInput';

export default {
    name: 'pizza',
    title: 'Pizzas',
    type: 'document',
    icon: () => '🍕',
    fields: [
        {
            name: 'name',
            title: 'Pizza name',
            type: 'string',
            description: 'The name of the pizza',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'toppings',
            title: 'Toppings',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'topping' }] }],
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'The price of the pizza in euro (€)',
            validation: Rule =>
                Rule.required()
                    .min(4)
                    .error('The minimum cost for a pizza is 4€'),
            inputComponent: PriceInput,
        },
    ],
    preview: {
        select: {
            name: 'name',
            media: 'image',
            price: 'price',
            topping0: 'toppings.0.name',
            topping1: 'toppings.1.name',
            topping2: 'toppings.2.name',
            topping3: 'toppings.3.name',
        },
        prepare: ({ name, media, price, ...toppings }) => {
            // filter undefined toppings in case there are less than 4
            const tops = Object.values(toppings).filter(
                topping => topping !== undefined
            );

            // Currency formatter
            const formatMoney = Intl.NumberFormat('it-IT', {
                style: 'currency',
                currency: 'EUR',
            }).format;

            // return preview elements
            return {
                title: `${name} - ${formatMoney(price)}`,
                media,
                subtitle: tops.join(', '),
            };
        },
    },
};
