import React from 'react';
import { Link } from 'gatsby';
import style from './style.module.scss';
import Logo from '../Logo';

const Nav = () => {
    return (
        <nav>
            <ul className={style.menu}>
                <li>
                    <Link to="/" className={style.activeLink}>
                        Hot Now
                    </Link>
                </li>
                <li>
                    <Link to="/pizzas" className={style.link}>
                        Pizza menu
                    </Link>
                </li>
                <li>
                    <Link to="/" className={style.link}>
                        <Logo logoWidth="200" />
                    </Link>
                </li>
                <li>
                    <Link to="/slicemasters" className={style.link}>
                        SliceMasters
                    </Link>
                </li>
                <li>
                    <Link to="/order" className={style.link}>
                        Order Now!
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
