import React from 'react';
import { Link } from 'gatsby';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/pizzas">Pizza menu</Link>
                </li>
                <li>
                    <Link to="/">LOGO</Link>
                </li>
                <li>
                    <Link to="/slicemasters">SliceMasters</Link>
                </li>
                <li>
                    <Link to="/order">Order Ahead!</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
