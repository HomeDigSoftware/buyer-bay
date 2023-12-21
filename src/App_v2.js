import React from 'react';
import { useState , useEffect  } from "react";
import axios from "axios";
import './App.css'
import { auth } from "./firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
import GamesButtons from './component/gamesData/GamesButtons.js';
import SiteHeader from '../src/component/gamesData/SiteHeader.js';
import StripTest from './services/StripeTest';
import StripePaymentRequest from './services/StripePaymentRequest';

import HomePage from './component/homepage.component.jsx';
import Lolpage from './component/Lol-Page/Lolpagecomponent.jsx';
import TestPage from './component/gamesData/TestPage.js';

import MainPage from "./component/gamesData/MainPage.js"
//  import {Elements} from '@stripe/react-stripe-js';
 import {loadStripe} from '@stripe/stripe-js';
//  import { createBrowserRouter } from 'npm:react-router-dom@^6.4';
//  import { createRoutesFromElements } from '../../../../C:/Users/tzaf2/AppData/Local/deno/npm/registry.npmjs.org/react-router/6.21.0/dist/index.d.ts';
//  import { Route } from '../../../../C:/Users/tzaf2/AppData/Local/deno/npm/registry.npmjs.org/react-router/6.21.0/dist/lib/components.d.ts';
 import { createBrowserRouter , Route , RouterProvider , createRoutesFromElements } from 'react-router-dom';
 import { NavLink, Outlet } from "react-router-dom";
//  import TestPage from './component/gamesData/TestPage.js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
 const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIP_KEY);


export default function App_v2(props) {
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

  function Pay_ID(props){
    return <div>
     { console.log( props )}

    </div>

  }


const Root = () => {
    return (
      <div>
       <Outlet />
       </div>
    )
  }
  
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
         <Route path='/' element={<Root />} >
          <Route index element={<MainPage />} />
          <Route path='homepage' element={<HomePage />} />
          <Route path='account' element={<Lolpage />} />
          <Route path='hook-to-payment/:id' element={<TestPage />} />       
          <Route path=':id' element={<TestPage />}  />       
      </Route>
    )
  )
  
 
  return (
    <div>
     
      {/* <SiteHeader /> */}
      {/* <TestingNavbar /> */}
      {/* <GamesButtons />  */}
      <RouterProvider router={myRouter} />
      {/* <Elements stripe={stripePromise} >
        {console.log(stripePromise)}
         <StripePaymentRequest />
      </Elements> */}
      
      {/* <Outlet /> */}
    
    </div>
  )
}


