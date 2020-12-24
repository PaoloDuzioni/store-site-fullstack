import React from 'react';
import { Link } from 'gatsby';
import Callout from '../components/Callout';

function HomePage() {
    return (
        <div className="container">
            <h1>It is the homepage</h1>

            <Callout>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                debitis reprehenderit natus eveniet{' '}
                <Link to="/">voluptatum</Link> nobis. Cupiditate dolorem
                reiciendis obcaecati laboriosam.
            </Callout>
        </div>
    );
}

export default HomePage;
