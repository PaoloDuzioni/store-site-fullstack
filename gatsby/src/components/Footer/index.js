import React from 'react';
import styles from './style.module.scss';

const Footer = () => {
    return (
        <footer className={`text-center ${styles.footer}`}>
            <p>&copy; Paolo's Pizza {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;
