import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App_v2 from './App_v2';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
     {/* <App/>  */}
     <App_v2 />
     {/* </BrowserRouter> */}
  </React.StrictMode>
);


