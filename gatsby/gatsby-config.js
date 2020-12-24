const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: `Pizza's Store`,
        description: `Your dreams Pizza Store`,
    },
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-source-sanity`,
            options: {
                projectId: `ptq38uru`,
                dataset: `production`,
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
};
