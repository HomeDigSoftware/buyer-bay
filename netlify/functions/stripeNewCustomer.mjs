// This is your test secret API key.
const stripe = require('stripe')(process.env.REACT_APP_PUBLIC_STRIP_KEY);
// const app = express();
// app.use(express.static('public'));

const YOUR_DOMAIN = "https://homedigsoftware.com";

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // https://buy.stripe.com/test_eVa6qnh2Cgcndxe9AA
        // price: process.env.REACT_APP_STRIPE_SMALL_PACK_PRICE_ID,
        price: '{{price_1OClZ0C95mfbzVU0L4a2qyls}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${"https://homedigsoftware.com"}?success=true`,
    cancel_url: `${"https://homedigsoftware.com"}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));