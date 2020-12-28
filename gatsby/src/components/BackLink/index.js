import React from 'react';
import { Link } from 'gatsby';
import styles from './style.module.scss';

const BackLink = ({ dest, pos, children }) => {
    // Check positioning
    let posStyles = {};
    if (pos) {
        console.log(pos);
        posStyles = {
            position: pos.type,
            top: pos.y,
            left: pos.x,
        };
    }

    return (
        <Link className={styles.backLink} to={dest} style={posStyles}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
            >
                <path d="M12 13v7l-8-8 8-8v7h8v2z" />
            </svg>
            {children}
        </Link>
    );
};

export default BackLink;
