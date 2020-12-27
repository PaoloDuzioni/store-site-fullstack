const path = require('path');
const axios = require('axios');

/***********************************************************************
    INSERT IN GATSBY's GraphQL API EXTERNAL REST API/GraphQL DATA

    You can test if the data been created correctly with GraphiQL
 ***********************************************************************/

/**
 * GET BEERS FROM EXTERNAL REST API
 */
async function fetchBeersYoNodes({
    actions,
    createNodeId,
    createContentDigest,
}) {
    // 1. fetch list of beer
    let beers = [];
    axios
        .get('https://sampleapis.com/beers/api/ale')
        .then(function (response) {
            // console.log(beers);
            beers = response.data;

            // 2. Loop over all the beers to create a node for the beer
            beers.forEach(beer => {
                const nodeMeta = {
                    id: createNodeId(`beer-${beer.name}`), // Gatsby's helper for unique IDs if you need
                    parent: null,
                    children: [],
                    internal: {
                        type: 'Beer', // in GraphQl API -> allBeer and beer
                        mediaType: 'application/json',
                        contentDigest: createContentDigest(beer),
                    },
                };

                actions.createNode({
                    ...beer,
                    ...nodeMeta,
                });
            });
        })
        .catch(error => {
            console.log(`Error on beers fetching: ${error}`);
        });
}

/**
 * SOURCE GENERATION OF NODES (DATA)
 */
exports.sourceNodes = async params => {
    await Promise.all([fetchBeersYoNodes(params)]);
};

/****************************************************************
    DINAMIC PAGES GENERATIONS WITH SANITY SOURCES
 ****************************************************************/

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
                    id
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);

    // 3. loop every topping and create a page for each topping
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.slug.current}`, // page URL
            component: toppingsTemplate,
            context: {
                toppingName: topping.name,
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
