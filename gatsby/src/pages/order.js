import React from 'react';
import SEO from '../components/SEO';
import SiteForm from '../components/SiteForm';

const OrderPage = () => {
    return (
        <>
            <SEO title="Order a pizza!" />

            <div className="container">
                <h1>Make you order</h1>

                <SiteForm />
            </div>
        </>
    );
};

export default OrderPage;
