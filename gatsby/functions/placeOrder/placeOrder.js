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
    const requiredFields = ['name', 'email', 'order']; // expected fields

    // Check required fields
    for (const field of requiredFields) {
        if (!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `You are missing the '${field}' field.`,
                }),
            };
        }
    }

    // Check if there is any order item
    if (!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `You can't place an empty order. Add at least one pizza.`,
            }),
        };
    }

    // Send email
    const info = await transporter.sendMail({
        from: "Paolo's Pizza Shop <pizzas@example.com>",
        to: `${body.name} <${body.email}>`,
        subject: `Paolo's Pizza - New order`,
        html: generateOrderEmail({
            order: body.order,
            total: body.total,
        }),
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Your order been placed successfully.',
        }),
    };
};

/**
 * HTML template to use on the sent email
 */
function generateOrderEmail({ order, total }) {
    return `<div>
        <h1>Paolo's Pizza</h1>
        <h2>Your recent order for ${total}€</h2>
        <p>We will have your order ready in the next 30 minutes, please start walking over.</p>
        <table>
            <thead>
                <tr>
                    <th class="text-left" colspan="2">Pizza name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            ${order
                .map(
                    item => `<tr>
                    <td class="image-cell">
                        <img src="${item.thumbnail}" alt="${item.name}">
                    </td>
                    <td>
                        ${item.name} ${item.size}
                    </td>
                    <td class="text-center">
                        ${item.price}€
                    </td>
            </tr>`
                )
                .join('')}
            </tbody>
            <tfooter>
                <tr>
                    <th class="text-right" colspan="2">Total:</th>
                    <th>${total}€</th>
                </tr>
            </tfooter>
        </table>
        <p>Payment due at pickup.</p>

        <style>
            * {
                font-family: sans-serif;
            }
            ul {
                list-style: none;
            }
            table {
                width: 100%;
                margin: 30px 0;
                border-collapse: collapse;
            }
            th, td {
                padding: 5px 10px;
                border: 1px solid #ccc;
            }
            .image-cell {
                width: 70px;
            }
            .text-left {
                text-align: left;
            }
            .text-center {
                text-align: center;
            }
            .text-right {
                text-align: right;
            }
        </style>
    </div>`;
}
