import React from 'react';
import styles from './style.module.scss';

const Footer = () => {
    return (
        <footer className={`text-center ${styles.footer}`}>
            <p>&copy; Pizza's Store {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;
