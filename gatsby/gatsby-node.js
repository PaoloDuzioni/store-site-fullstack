const path = require(`path`);

/**
 * PIZZAS PAGES
 */
async function pizzasToPages({ graphql, actions }) {
    // 1. get template for this kind of page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

    // 2. Get all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);

    // 3. loop every pizza and create a page for each pizza
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            path: `pizza/${pizza.slug.current}`, // page URL
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            },
        });
    });
}

/**
 * TOPPING PAGES
 */
async function toppingsToPages({ graphql, actions }) {
    // 1. get template for this kind of page
    const toppingsTemplate = path.resolve('./src/pages/pizzas.js'); // use same page as pizzas pages

    // 2. Get all pizzas
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `);

    // 3. loop every topping and create a page for each topping
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.name}`, // page URL
            component: toppingsTemplate,
            context: {
                topping: topping.name,
            },
        });
    });
}

/**
 * PAGES GENERATION
 */
exports.createPages = async params => {
    // wait for all promise to be resolved before finishing this function
    await Promise.all([
        // 1. Pizzas
        pizzasToPages(params),

        // 2. Toppings
        toppingsToPages(params),
    ]);

    // 3. Slicemasters
};
