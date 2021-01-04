import PriceInput from '../components/PriceInput';

export default {
    name: 'storeSettings',
    title: 'Global Site Settings',
    type: 'document',
    icon: () => '⚙️',
    fields: [
        {
            name: 'sitename',
            title: 'Site Name',
            description: 'The name of your site',
            type: 'string',
        },
        {
            name: 'pizzamasters',
            title: 'Pizza Master Slicing now',
            description: 'List of the Pizza Master actually active',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'person' }],
                },
            ],
        },
    ],
};
