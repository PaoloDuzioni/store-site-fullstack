import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const SEO = ({ children, location, title, description, image }) => {
    // Get site data
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);

    return (
        <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
            <html lang="en" />
            {/* Metatags */}
            <title>{title}</title>
            <meta name="description" content={site.siteMetadata.description} />
            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" />
            {/* Open Graph */}
            {location && <meta property="og:url" content={location.href} />}
            <meta property="og:image" content={image || '/logo.png'} />
            <meta property="og:title" content={title} key="og:title" />
            <meta property="og:site_name" content={site.siteMetadata.title} />
            <meta
                property="og:description"
                content={description}
                key="og:description"
            />
            {children}
        </Helmet>
    );
};

export default SEO;
