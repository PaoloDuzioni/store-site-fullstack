import React from 'react';
import { graphql, Link } from 'gatsby';
import PizzaDetail from '../components/PizzaDetail';
import BeersList from '../components/BeersList';
import MasterDetail from '../components/MasterDetail';
import Callout from '../components/Callout';
import SEO from '../components/SEO';

function HomePage({ data: { pizzas, masters } }) {
    // Get a random pizza form all pizzas
    const randPizzaIndex = Math.floor(Math.random() * pizzas.nodes.length);
    const randomPizza = pizzas.nodes[randPizzaIndex];

    // Get a random master form all masters
    const randMasterIndex = Math.floor(Math.random() * masters.nodes.length);
    const randomMaster = masters.nodes[randMasterIndex];

    return (
        <>
            <SEO title="Welcome!" />

            <div className="container">
                <section className="mb-4">
                    <h1 className="mb-2">Not sure which pizza take?</h1>
                    <PizzaDetail pizza={randomPizza} />
                </section>

                <BeersList />

                <section className="mb-4">
                    <h2 className="mb-2">Read About one of our masters</h2>
                    <MasterDetail master={randomMaster} />
                </section>

                <Callout>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Amet debitis reprehenderit natus eveniet{' '}
                    <Link to="/">voluptatum</Link> nobis. Cupiditate dolorem
                    reiciendis obcaecati laboriosam.
                </Callout>
            </div>
        </>
    );
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                id
                name
                price
                image {
                    asset {
                        fluid(maxWidth: 800, maxHeight: 600) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                toppings {
                    name
                    id
                    vegan
                }
            }
        }
        masters: allSanityPerson {
            nodes {
                id
                name
                image {
                    asset {
                        fluid(maxWidth: 800, maxHeight: 600) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                description
            }
        }
    }
`;

export default HomePage;
