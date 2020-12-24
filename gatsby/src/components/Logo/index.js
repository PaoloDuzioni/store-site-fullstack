import React from 'react';
import LogoImg from '../../assets/site-logo.svg';

const Logo = ({ logoWidth }) => {
    return <img src={LogoImg} width={logoWidth} alt="" />;
};

export default Logo;
