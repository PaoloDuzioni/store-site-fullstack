import React from 'react';
import { Link } from 'gatsby';
import style from './style.module.scss';
import Logo from '../Logo';

const Nav = () => {
    return (
        <nav>
            <ul className={style.menu}>
                <li>
                    <Link to="/">Hot Now</Link>
                </li>
                <li>
                    <Link to="/pizzas">Pizza menu</Link>
                </li>
                <li>
                    <Link to="/">
                        <Logo logoWidth="200" />
                    </Link>
                </li>
                <li>
                    <Link to="/slicemasters">SliceMasters</Link>
                </li>
                <li>
                    <Link to="/order">Order Now!</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
