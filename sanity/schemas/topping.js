export default {
    name: 'topping',
    title: 'Toppings',
    type: 'document',
    icon: () => '🌶',
    fields: [
        {
            name: 'name',
            title: 'Topping name',
            type: 'string',
            description: 'The  name of the topping',
        },
        {
            name: 'vegan',
            title: 'Vegan',
            type: 'boolean',
            description: 'Is a vegan topping?',
        },
    ],
    preview: {
        select: {
            name: 'name',
            vegan: 'vegan',
        },
        prepare: ({ name, vegan }) => ({
            title: `${name} ${vegan ? '🌱' : ''}`,
        }),
    },
};
