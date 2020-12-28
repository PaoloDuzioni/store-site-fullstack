import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Logo from '../Logo';
import styles from './style.module.scss';

const Footer = () => {
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
        <footer className={`mt-2 text-center ${styles.footer}`}>
            <Logo logoWidth="80" />
            <p>
                &copy; {site.siteMetadata.title} {new Date().getFullYear()} -{' '}
                {site.siteMetadata.description}
            </p>
        </footer>
    );
};

export default Footer;
