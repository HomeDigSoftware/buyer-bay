import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App.js';
import App_v2 from './App_v2.js';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIP_KEY);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
     <div>
          {/* <Elements stripe={stripePromise} > */}
            <App_v2 />
         {/* </Elements> */}
     </div>

);


