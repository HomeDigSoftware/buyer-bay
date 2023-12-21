import React from 'react';
import Stripe from 'stripe';

// const stripe = require('stripe')(process.env.REACT_APP_SECRET_STRIPE_KEY);
const stripe = new Stripe(process.env.REACT_APP_SECRET_STRIPE_KEY , {apiVersion: 2023-10-16});


const lineItems = await stripe.checkout.sessions.listLineItems(
  'cs_test_a1enSAC01IA3Ps2vL32mNoWKMCNmmfUGTeEeHXI5tLCvyFNGsdG2UNA7mr'
);

export default function StripeTesting(){
    return(
        <div>
            <button className='data-btn' onClick={() => lineItems}>S testing </button>
        </div>
    )
}

