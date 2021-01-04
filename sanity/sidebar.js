import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

/**
 * Create a custom sidebar to replace the default of Sanity
 *
 * remember to set this component on the sanity.json
 */
const Sidebar = () => {
    return S.list()
        .title(`Store Admin`)
        .items([
            // New custom sub item for global settings
            S.listItem()
                .title('Global Settings')
                .icon(() => '🍽')
                .child(
                    // no creation panel but directly to edit settings page
                    S.editor()
                        .title('Global Settings')
                        .schemaType('storeSettings')
                        // new document ID
                        .documentId('frontpage')
                ),
            // add the rest of our documents (schemas) excluding the global setting
            // defined already before
            ...S.documentTypeListItems().filter(
                item => item.getId() !== 'storeSettings'
            ),
        ]);
};

export default Sidebar;
