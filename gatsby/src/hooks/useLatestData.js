import { useEffect, useState } from 'react';
import axios from 'axios';

// Fakes gql tagged template literal to syntax highlighting
const gql = String.raw;

/**
 * Hook to get latest data inserted in Sanity
 *
 * no grphql here because it get fetched only on build time
 */
export default function useLatestData() {
    // STATES
    // Site name
    const [siteName, setSiteName] = useState();
    // Site description
    const [siteDescription, setSiteDescription] = useState();
    // Pizza masters active
    const [pizzaMasters, setPizzaMasters] = useState();

    // When component loads then fetch the data
    useEffect(() => {
        axios
            .post(process.env.GATSBY_GRAPHQL_ENDPOINT, {
                query: gql`
                    query {
                        StoreSettings(id: "frontpage") {
                            sitename
                            sitedescription
                            pizzamasters {
                                _id
                                name
                                slug {
                                    current
                                }
                                image {
                                    asset {
                                        url
                                        metadata {
                                            lqip
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
            })
            .then(response => {
                console.log('HOOK RESPONSE:', response.data);
                const { data } = response.data;

                setSiteName(data.StoreSettings.sitename);
                setSiteDescription(data.StoreSettings.sitedescription);
                setPizzaMasters(data.StoreSettings.pizzamasters);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return {
        siteName,
        siteDescription,
        pizzaMasters,
    };
}
