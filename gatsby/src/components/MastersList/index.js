import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from './style.module.scss';

const MastersList = ({ masters }) => {
    return (
        <section className={styles.mastersSection}>
            {masters.length > 0 && <p>Loading data...</p>}

            <ul className={`no-list ${styles.mastersList}`}>
                {masters.map(master => (
                    <li className={styles.masterContainer} key={master.id}>
                        <Link to={`/master/${master.slug.current}`}>
                            <figure className={styles.masterImage}>
                                <Img
                                    fluid={master.image.asset.fluid}
                                    alt={master.name}
                                />
                            </figure>
                            <h2 className={styles.masterTitle}>
                                {master.name}
                            </h2>
                            <div className={styles.masterDescription}>
                                {master.description}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MastersList;
