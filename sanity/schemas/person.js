export default {
    name: 'person',
    title: 'People',
    type: 'document',
    icon: () => '👨🏻‍🍳',
    fields: [
        {
            name: 'name',
            title: 'Person name',
            type: 'string',
            description: 'The name of the person',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: "Person's Bio",
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
};
