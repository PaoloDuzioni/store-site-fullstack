import React from 'react';
import styles from './style.module.scss';

const Callout = ({ children }) => {
    return <div className={styles.callout}>{children}</div>;
};

export default Callout;
