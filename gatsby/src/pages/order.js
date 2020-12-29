import React from 'react';
import SEO from '../components/SEO';
import SiteForm from '../components/SiteForm';

const OrderPage = () => {
    return (
        <>
            <SEO title="Order a pizza!" />

            <div className="container">
                <h1>Orders Page here</h1>

                <SiteForm />
            </div>
        </>
    );
};

export default OrderPage;
