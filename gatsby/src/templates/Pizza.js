import React from 'react';
import { graphql } from 'gatsby';
import PizzaDetail from '../components/PizzaDetail';
import SEO from '../components/SEO';

const SinglePizzaPage = ({ data: { pizza } }) => {
    return (
        <>
            <SEO title={pizza.name} image={pizza.image.asset.fluid.src} />

            <section className="container page-single">
                <PizzaDetail pizza={pizza} />
            </section>
        </>
    );
};

// Get pizza by slug pased as context from gatsby-node-js
export const query = graphql`
    query($slug: String!) {
        pizza: sanityPizza(slug: { current: { eq: $slug } }) {
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
`;

export default SinglePizzaPage;
