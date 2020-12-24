import React from 'react';
import { Link } from 'gatsby';

const Pizza = ({ details }) => {
    return (
        <li>
            <Link to={`/pizza/${details.slug.current}`}>
                <h2>{details.name}</h2>
                <div>{details.price.toFixed(2)}€</div>
            </Link>
        </li>
    );
};

export default Pizza;
