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
 * PAGES GENERATION
 */
exports.createPages = async params => {
    // Create pages dinamically
    // 1. Pizzas
    await pizzasToPages(params);
    // 2. Toppings
    // 3. Slicemasters
};
