const path = require('path');
const axios = require('axios');

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
    try {
        const response = await axios.get(
            'https://api.sampleapis.com/beers/ale'
        );
        const beers = response.data;

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
    } catch (error) {
        console.error(error);
    }
}

/**
 * SOURCE GENERATION OF NODES (DATA)
 */
exports.sourceNodes = async params => {
    await Promise.all([fetchBeersToNodes(params)]);
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
 * PIZZA MASTERS SINGLE PAGES AND PAGES WITH PAGINATION
 */
async function mastersToPages({ graphql, actions }) {
    // 1. get templates for those pages:
    // Master Single
    const masterSingleTemplate = path.resolve('./src/templates/Master.js');
    // Masters Paginated Paged
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

    // 3. loop every master and create a page for each master
    data.masters.nodes.forEach(master => {
        actions.createPage({
            path: `master/${master.slug.current}`, // page URL
            component: masterSingleTemplate,
            context: {
                name: master.name,
                slug: master.slug.current,
            },
        });
    });

    // 4. Pagination
    const postPerPage = process.env.GATSBY_MASTERS_PER_PAGE;
    const pageCount = Math.ceil(data.masters.totalCount / postPerPage);
    // Loop from 1 to n and create the pagination pages
    Array.from({ length: pageCount }).map((_, i) => {
        actions.createPage({
            path: `/pizzamasters/${i + 1}`,
            component: mastersPaginationTemplate,
            context: {
                skip: i * postPerPage,
                currentPage: i + 1,
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

        // 3. PizzaMasters
        mastersToPages(params),
    ]);
};
