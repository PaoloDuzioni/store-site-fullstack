import React from 'react';
import { graphql } from 'gatsby';
import MastersList from '../components/MastersList';

const PizzaMastersPage = ({ data }) => {
    const masters = data.masters.nodes;

    return (
        <div className="container">
            <h1>Get to know our pizza Masters</h1>

            <MastersList masters={masters} count={data.masters.totalCount} />
        </div>
    );
};

export const query = graphql`
    query {
        masters: allSanityPerson {
            totalCount
            nodes {
                id
                name
                slug {
                    current
                }
                description
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

export default PizzaMastersPage;
