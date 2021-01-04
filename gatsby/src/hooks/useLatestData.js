import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Hook to get latest data inserted in Sanity
 *
 * no grphql here because it get fetched only on build time
 */
export default function useLatestData() {
    // Site name

    // Pizza masters active
    const [pizzaMasters, setPizzaMasters] = useState();

    // When component loads then fetch the data
    useEffect(() => {
        axios
            .post(process.env.GATSBY_GRAPHQL_ENDPOINT, {
                query: `
            query {
                StoreSettings(id: "frontpage") {
                  sitename,
                  pizzamasters {
                      name
                  }
                }
              }
            `,
            })
            .then(response => {
                console.log('HOOK RESPONSE:', response.data);

                setPizzaMasters(response.data.data.StoreSettings.pizzamasters);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return {
        pizzaMasters,
    };
}
