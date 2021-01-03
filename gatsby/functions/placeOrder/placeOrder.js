const nodemailer = require('nodemailer');

/**
 * Create Nodemailer transporter
 */
const transporter = nodemailer.createTransport({
    // testing provided by mailtrap.io
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * Send the order email (called with ajax)
 *
 * to test: http://localhost:8888/.netlify/functions/placeOrder
 */
exports.handler = async (event, context) => {
    // Validate data
    const { body } = JSON.parse(event.body);
    const requiredFields = ['email', 'name', 'order']; // expected fields

    // Check
    for (const field of requiredFields) {
        if (!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'You are missing the fields.',
                }),
            };
        }
    }

    // Send email
    const info = await transporter.sendMail({
        from: "Paolo's Pizza Shop <pizzas@example.com>",
        to: `${body.name} <${body.email}>`,
        subject: 'New order',
        html: generateOrderEmail({
            order: body.order,
            total: body.total,
        }),
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success!' }),
    };
};

/**
 * HTML template to use on the sent email
 */
function generateOrderEmail({ order, total }) {
    return `<div>
        <h2>Your recent order for ${total}€</h2>

        <p>We will have your order ready in the next 30 minutes, please start walking over.</p>

        <ul>
           ${order
               .map(
                   item => `<li>
            <img src="${item.thumbnail}" alt="${item.name}">
            ${item.name} ${item.size} ${item.price}€
           </li>`
               )
               .join('')}
        </ul>

        <p>Your total is: <strong>${total}€</strong> due at pickup.</p>

        <style>
            ul {
                list-style: none;
            }
        </style>
    </div>`;
}
