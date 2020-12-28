import React from 'react';
import Img from 'gatsby-image';
import BackLink from '../BackLink';
import styles from './style.module.scss';

const MasterDetail = ({ master }) => {
    return (
        <div className={styles.masterDetail}>
            <figure className={styles.masterImage}>
                <Img fluid={master.image.asset.fluid} alt={master.name} />
            </figure>

            <div className={styles.masterContents}>
                <BackLink dest="/pizzamasters">master Menu</BackLink>

                <h1 className={`mt-2 ${styles.masterTitle}`}>{master.name}</h1>

                <div className={styles.masterDescription}>
                    {master.description}
                </div>
            </div>
        </div>
    );
};

export default MasterDetail;
