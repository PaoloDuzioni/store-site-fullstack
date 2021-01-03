/**
 * NETLIFY FUNCTIONS EXAMPLE
 *
 * After npm run netlify you can visit the following pages
 * to see the the Hello message:
 * http://localhost:8888/.netlify/functions/hello
 *
 * Docs on serverless functions:
 * https://www.netlify.com/products/functions/
 *
 */
exports.handler = async (event, context) => {
    console.log(event); // on server console

    return {
        statusCode: 200,
        body: 'Hello!',
    };
};
