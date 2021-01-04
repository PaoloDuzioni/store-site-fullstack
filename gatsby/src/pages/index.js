import React from 'react';
import { graphql, Link } from 'gatsby';
import useLatestData from '../hooks/useLatestData';
import CuttingMasters from '../components/CuttingMasters';
import PizzaDetail from '../components/PizzaDetail';
import BeersList from '../components/BeersList';
import Callout from '../components/Callout';
import SEO from '../components/SEO';

function HomePage({ data: { pizzas } }) {
    // Get latest data
    const { pizzaMasters } = useLatestData();

    // Get a random pizza
    const randPizzaIndex = Math.floor(Math.random() * pizzas.nodes.length);
    const randomPizza = pizzas.nodes[randPizzaIndex];

    return (
        <>
            <SEO title="Welcome!" />

            <div className="container">
                <section className="mb-4">
                    <h1 className="mb-2">Not sure which pizza take?</h1>
                    <PizzaDetail pizza={randomPizza} />
                </section>

                <section className="mb-4">
                    <CuttingMasters masters={pizzaMasters} />
                </section>

                <BeersList />

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
    }
`;

export default HomePage;
