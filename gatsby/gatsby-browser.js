import React from 'react';
import Layout from './src/components/Layout/';
import { OrderProvider } from './src/components/OrderContext';

/**
 * Wrap all pages with a Layout component.
 */
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};

/**
 * Wrap the Root component of Gatsby with a OrderProvider
 * To create a global state compnent that never get unmounted
 * during the navigation of the site's pages
 */
export function wrapRootElement({ element }) {
    return <OrderProvider>{element}</OrderProvider>;
}
