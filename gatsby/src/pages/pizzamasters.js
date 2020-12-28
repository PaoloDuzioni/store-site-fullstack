import React from 'react';
import { graphql } from 'gatsby';
import MastersList from '../components/MastersList';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const PizzaMastersPage = ({ data, pageContext }) => {
    const masters = data.masters.nodes;

    return (
        <>
            <SEO title={`Pizza Master page ${pageContext.currentPage || 1}`} />
            <div className="container">
                <h1 className="mb-1">Get to know our pizza Masters</h1>

                <div class="flex space-between mb-1">
                    <h3>We actually have {data.masters.totalCount} masters</h3>
                    <Pagination
                        postPerPage={process.env.GATSBY_MASTERS_PER_PAGE}
                        pageCount={data.masters.totalCount}
                        currentPage={pageContext.currentPage || 1}
                        base="/pizzamasters"
                    />
                </div>

                <MastersList masters={masters} />

                <Pagination
                    postPerPage={process.env.GATSBY_MASTERS_PER_PAGE}
                    pageCount={data.masters.totalCount}
                    currentPage={pageContext.currentPage || 1}
                    base="/pizzamasters"
                />
            </div>
        </>
    );
};

export const query = graphql`
    query($skip: Int = 0, $postPerPage: Int = 3) {
        masters: allSanityPerson(limit: $postPerPage, skip: $skip) {
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
