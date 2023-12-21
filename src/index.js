import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App_v2 from './App_v2.js';
//import App from './App.js';

import {createBrowserRouter, createRoutesFromElements,  Route ,RouterProvider , Outlet} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import HomePage from './component/homepage.component.jsx';
// import Lolpage from './component/Lol-Page/Lolpagecomponent.jsx';
// import TestPage from './component/gamesData/TestPage.js';

// const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIP_KEY);

// function Pay_ID(props){
//      return props
//    }
 
 
// const Root = () => {
//      return (
//        <div>
//         <Outlet />
//         </div>
//      )
//    }
   
//    const myRouter = createBrowserRouter(
//      createRoutesFromElements(
//           <Route path='/' element={<Root />} >
//            <Route index element={<App_v2 />} />
//            <Route path='homepage' element={<HomePage />} />
//            <Route path='account' element={<Lolpage />} />
//            <Route path='hook-to-payment/:id' element={<TestPage />} Component={Pay_ID} />       
//        </Route>
//      )
//    )
   
   
   
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
        
        <div>
          {/* <Elements stripe={stripePromise} >  */}
            <App_v2 />
         {/* </Elements>  */}
      {/* <RouterProvider router={myRouter} /> */}

     </div>

);



