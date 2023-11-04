import React from 'react';
import { useState } from "react";
import axios from "axios";
import './App.css'
import { auth } from "./firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
import { GamesButtons } from './component/gamesData/GamesButtons.js';
import { SiteHeader } from './SiteHeader.js';


export default function App_v2() {
 // const [user] = useAuthState(auth);
  const [upcomingData, setUpcomingData] = useState([]);
 

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
        authorization:
          "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
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
      
    </div>
  )
}


