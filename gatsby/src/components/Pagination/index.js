import { Link } from 'gatsby';
import React from 'react';
import styles from './style.module.scss';

const Pagination = ({ base, currentPage, postPerPage, pageCount }) => {
    const totalPages = Math.ceil(pageCount / postPerPage);
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const hasNextPage = nextPage <= totalPages;
    const hasPrevPage = prevPage >= 1;

    return (
        <section className={styles.pagination}>
            <Link
                className={styles.textualLink}
                disabled={!hasPrevPage}
                to={`${base}/${prevPage}`}
            >
                Prev
            </Link>

            {Array.from({ length: totalPages }).map((_, i) => (
                <Link to={`${base}${i > 0 ? `/${i + 1}` : ''}`}>{i + 1}</Link>
            ))}

            <Link
                className={styles.textualLink}
                disabled={!hasNextPage}
                to={`${base}/${nextPage}`}
            >
                Next
            </Link>
        </section>
    );
};

export default Pagination;
