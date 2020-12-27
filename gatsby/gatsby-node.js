const path = require('path');
const axios = require('axios');

/****************************************************************
    DINAMIC PAGES GENERATIONS WITH SANITY SOURCES

    Keep this as first creation
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
 * PIZZA MASTERS PAGES WITH PAGINATION
 */
async function mastersToPages({ graphql, actions }) {
    // 1. get template for this kind of page
    const mastersPaginationTemplate = path.resolve(
        './src/pages/pizzamasters.js'
    );

    // 2. Get all masters
    const { data } = await graphql(`
        query {
            masters: allSanityPerson {
                totalCount
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
    // data.toppings.nodes.forEach(topping => {
    //     actions.createPage({
    //         path: `topping/${topping.slug.current}`, // page URL
    //         component: toppingsTemplate,
    //         context: {
    //             toppingName: topping.name,
    //         },
    //     });
    // });

    // 4. Pagination
    const postPerPage = 3;
    const pageCount = Math.ceil(data.masters.totalCount / postPerPage);
    // Loop from 1 to n and create the pagination pages
    for (let index = 1; index <= pageCount; index++) {
        actions.createPage({
            path: `/pizzamasters/${index}`,
            component: mastersPaginationTemplate,
            context: {
                skip: index * postPerPage,
                currentPage: index,
                pageCount,
            },
        });
    }
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

        // 3. PizzaMasters
        mastersToPages(params),
    ]);
};

/***********************************************************************
    INSERT IN GATSBY's GraphQL API EXTERNAL REST API/GraphQL DATA

    You can test if the data been created correctly with GraphiQL
 ***********************************************************************/

/**
 * GET BEERS FROM EXTERNAL REST API
 */
async function fetchBeersToNodes({
    actions,
    createNodeId,
    createContentDigest,
}) {
    // 1. fetch list of beer
    axios
        .get('https://sampleapis.com/beers/api/ale')
        .then(function (response) {
            const beers = response.data;
            console.log(beers);

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
    await Promise.all([fetchBeersToNodes(params)]);
};
