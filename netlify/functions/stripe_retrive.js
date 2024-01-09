const stripe = require('stripe')(process.env.REACT_APP_SECRET_STRIPE_KEY);

exports.handler =  async(event , context) => {

const paymentIntent = await stripe.paymentIntents.retrieve(
    "pi_3OSPHzC95mfbzVU01iKOExzV"
  );
  return {
    statusCode: 200,
    body: JSON.stringify({
        data: paymentIntent,
    }),
  };
}