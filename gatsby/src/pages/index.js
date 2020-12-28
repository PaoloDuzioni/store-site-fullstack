import React from 'react';
import { Link } from 'gatsby';
import BeersList from '../components/BeersList';
import Callout from '../components/Callout';
import SEO from '../components/SEO';

function HomePage() {
    return (
        <>
            <SEO title="Welcome!" />

            <div className="container">
                <BeersList />

                <Callout>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Amet debitis reprehenderit natus eveniet{' '}
                    <Link to="/">voluptatum</Link> nobis. Cupiditate dolorem
                    reiciendis obcaecati laboriosam.
                </Callout>
            </div>
        </>
    );
}

export default HomePage;
