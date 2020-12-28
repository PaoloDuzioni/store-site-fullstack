import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ratingStartConverter from '../../utils/ratingStartConverter';
import styles from './style.module.scss';

const BeersList = () => {
    // Get first 10 beers
    const data = useStaticQuery(graphql`
        query {
            beers: allBeer(limit: 10, skip: 2) {
                nodes {
                    id
                    name
                    price
                    image
                    rating {
                        average
                        reviews
                    }
                }
            }
        }
    `);

    // Randomize beers results
    const shuffledBeers = data.beers.nodes.sort(() => Math.random() - 0.5);

    return (
        <section className={styles.beersSection}>
            <h2 className={styles.sectionTitle}>
                A good pizza needs a good beer
            </h2>

            <ul className={`no-list ${styles.beersList}`}>
                {shuffledBeers.map(beer => (
                    <li className={styles.beerBox} key={beer.id}>
                        <figure className={styles.beerImage}>
                            <img src={beer.image} alt={beer.name} />
                        </figure>
                        <h3 className={styles.beerTitle}>{beer.name}</h3>
                        <div className={styles.beerPrice}>{beer.price}</div>
                        <div
                            className={styles.beerRating}
                            title={`${beer.rating.average} out of 5 stars`}
                        >
                            <span>
                                {ratingStartConverter(beer.rating.average, 5)}
                            </span>
                            <span>({beer.rating.reviews})</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BeersList;
