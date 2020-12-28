import React from 'react';
import { graphql } from 'gatsby';
import MasterDetail from '../components/MasterDetail';
import SEO from '../components/SEO';

const SingleMasterPage = ({ data: { person } }) => {
    return (
        <>
            <SEO title={person.name} image={person.image.asset.fluid.src} />

            <section className="container page-single">
                <MasterDetail master={person} />
            </section>
        </>
    );
};

// Get master by slug pased as context from gatsby-node-js
export const query = graphql`
    query($slug: String!) {
        person: sanityPerson(slug: { current: { eq: $slug } }) {
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
`;

export default SingleMasterPage;
