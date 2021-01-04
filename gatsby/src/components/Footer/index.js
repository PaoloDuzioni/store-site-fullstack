import React from 'react';
import useLatestData from '../../hooks/useLatestData';
import Logo from '../Logo';
import styles from './style.module.scss';

const Footer = () => {
    const { siteName, siteDescription } = useLatestData();

    return (
        <footer className={`mt-2 text-center ${styles.footer}`}>
            <Logo logoWidth="80" />
            <p>
                &copy; {siteName} {new Date().getFullYear()} - {siteDescription}
            </p>
        </footer>
    );
};

export default Footer;
