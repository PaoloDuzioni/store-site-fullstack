import React from 'react';
import Footer from '../Footer/';

import 'normalize.css';
import 'typeface-roboto';
import 'typeface-lobster';
import '../../styles/main.scss';

import style from './style.module.scss';
import Header from '../Header';

const Layout = ({ children }) => {
    return (
        <div className={style.app}>
            <Header />
            <main className={style.mainContent}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
