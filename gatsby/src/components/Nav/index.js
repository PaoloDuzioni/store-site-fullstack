import React from 'react';
import { Link } from 'gatsby';
import style from './style.module.scss';
import Logo from '../Logo';

const Nav = () => {
    return (
        <nav className="container">
            <ul className={style.menu}>
                <li>
                    <Link
                        to="/"
                        activeClassName={style.activeLink}
                        className={style.link}
                    >
                        Welcome
                    </Link>
                </li>
                <li>
                    <Link
                        to="/pizzas"
                        activeClassName={style.activeLink}
                        className={style.link}
                    >
                        Pizza menu
                    </Link>
                </li>
                <li>
                    <Link to="/" className={style.link}>
                        <Logo logoWidth="200" />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/slicemasters"
                        activeClassName={style.activeLink}
                        className={style.link}
                    >
                        Pizza Masters
                    </Link>
                </li>
                <li>
                    <Link
                        to="/order"
                        activeClassName={style.activeLink}
                        className={style.link}
                    >
                        Order Now!
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
