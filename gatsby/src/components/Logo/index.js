import React from 'react';
import LogoImg from '../../assets/logo.png';

const Logo = ({ logoWidth }) => {
    return <img src={LogoImg} width={logoWidth} alt="" />;
};

export default Logo;
