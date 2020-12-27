import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data, pageContext }) => {
    const pizzas = data.pizzas.nodes;

    return (
        <div className="container">
            <h1>Choose the best pizza in the world</h1>

            <ToppingsFilter activeTopping={pageContext.toppingName} />

            <PizzaList pizzas={pizzas} />
        </div>
    );
};

export default PizzasPage;

export const query = graphql`
    query($toppingName: String) {
        pizzas: allSanityPizza(
            filter: { toppings: { elemMatch: { name: { eq: $toppingName } } } }
        ) {
            nodes {
                id
                name
                slug {
                    current
                }
                price
                toppings {
                    id
                    name
                    vegan
                }
                image {
                    asset {
                        fluid(maxWidth: 340, maxHeight: 340) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
