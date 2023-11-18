import React from 'react';
import { useState , useEffect  } from "react";
import axios from "axios";
import './App.css'
import { auth } from "./firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
import { GamesButtons } from './component/gamesData/GamesButtons.js';
import { SiteHeader } from './SiteHeader.js';
import StripTest from './services/StripeTest';
import StripePaymentRequest from './services/StripePaymentRequest';



 import {Elements} from '@stripe/react-stripe-js';
 import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
 const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIP_KEY);


export default function App_v2() {
 // const [user] = useAuthState(auth);
  const [upcomingData, setUpcomingData] = useState([]);
 

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{process.env.REACT_APP_SECRET_STRIPE_KEY}}',
  };


  function handleGetUpcoming() {
    const options = {
      method: "GET",
      url: "https://api.pandascore.co/matches/upcoming",
      params: {
        sort: "begin_at",
        page: "1",
        per_page: "5",
      },
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.REACT_APP_PANDASCORE_KEY}`
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setUpcomingData(response.data);

        //  console.log(fifaData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }



  

  return (
    <div>
      <SiteHeader />
      {/* <TestingNavbar /> */}
      <GamesButtons /> 
      <Elements stripe={stripePromise} >
        {console.log(stripePromise)}
         <StripePaymentRequest />
      </Elements>
   
    
    </div>
  )
}


