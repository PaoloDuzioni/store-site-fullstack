import React from 'react';
import styles from './style.module.scss';

const CuttingMasters = ({ masters }) => {
    console.log(masters);
    return (
        <div>
            <h2 className={`mb-2 ${styles.sectionTitle}`}>
                Pizza masters currently slicing
            </h2>

            {!masters && <p>Loading masters, please wait...</p>}

            <ul className={`no-list ${styles.mastersList}`}>
                {masters &&
                    masters.map(master => (
                        <li key={master._id} className={styles.masterItem}>
                            <figure className={styles.masterImage}>
                                {/*
                                    Image query string -> Sanity has crop image tool by url query string
                                    'style' -> Low quality image while the full quality loads
                                */}
                                <a href={`master/${master.slug.current}`}>
                                    <img
                                        src={`${master.image.asset.url}?w=400&h=400&fit=crop`}
                                        alt={master.name}
                                        width="400"
                                        height="400"
                                        style={{
                                            backgroundImage: `url(${master.image.asset.metadata.lqip})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </a>
                            </figure>
                            <h3 className={styles.masterTitle}>
                                {master.name}
                            </h3>
                            <a
                                href={`master/${master.slug.current}`}
                                className="button full"
                            >
                                See profile
                            </a>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default CuttingMasters;
