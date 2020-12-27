import React from 'react';
import { Link } from 'gatsby';
import style from './style.module.scss';
import Logo from '../Logo';

const Nav = () => {
    return (
        <nav className="container">
            <ul className={`no-list ${style.menu}`}>
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
                    <Link
                        to="/"
                        className={`${style.noRotation} ${style.link}`}
                    >
                        <Logo logoWidth="200" />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/pizzamasters"
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
