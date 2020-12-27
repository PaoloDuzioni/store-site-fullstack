import React from 'react';
import { graphql } from 'gatsby';
import PizzaDetail from '../components/PizzaDetail';

const SinglePizzaPage = ({ data: { pizza } }) => {
    console.log(pizza);
    return (
        <section className="container page-single">
            <PizzaDetail pizza={pizza} />
        </section>
    );
};

export default SinglePizzaPage;

// Get pizza by slug pased as context from gatsby-node-js
export const query = graphql`
    query($slug: String!) {
        pizza: sanityPizza(slug: { current: { eq: $slug } }) {
            id
            name
            price
            image {
                asset {
                    fluid(maxWidth: 800) {
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
