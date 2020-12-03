import React from 'react';
import Nav from '../Nav/';
import Footer from '../Footer/';

import 'normalize.css';
import 'typeface-roboto';
import 'typeface-lobster';
import '../../styles/main.scss';

import style from './style.module.scss';

const Layout = ({ children }) => {
    return (
        <div className={style.app}>
            <Nav />
            <main className={style.mainContent}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
