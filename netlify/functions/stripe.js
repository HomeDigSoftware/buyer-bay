// const stripe = require('stripe')(process.env.REACT_APP_PUBLIC_STRIP_KEY);
const stripe = require('stripe')(process.env.REACT_APP_SECRET_STRIPE_KEY);
// const app = express();
// app.use(express.static('public'));



exports.handler = async (event, context) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://serverless-payments.netlify.app/success",
      cancel_url: "https://serverless-payments.netlify.app/cancel",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: session,
        // id: session.id,
      }),
    };
  };