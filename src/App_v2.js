import React from 'react';
import { useState } from "react";
import axios from "axios";
import './App.css'
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GamesButtons } from './component/gamesData/GamesButtons';
import { SiteHeader } from './SiteHeader';


export default function App_v2() {
  const [user] = useAuthState(auth);
  const [upcomingData, setUpcomingData] = useState([]);
  const [valorantMatch, setValorantMatch] = useState([]);
  const [csgoMatch, setCsgoMatch] = useState([]);
  const [dota2Match, setDota2Match] = useState([]);
  const [lolMatch, setLolMatch] = useState([]);

  //________________________________________________


  function handleGetCSGOMatch() {
    const options = {
      method: "GET",
      url: "https://api.pandascore.co/csgo/matches/upcoming",
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
        console.log(response.data);
        setCsgoMatch(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  // for the git push have to add somting
  function handleGetDota2() {
    const options = {
      method: "GET",
      url: "https://non-cors.herokuapp.com/https://api.pandascore.co/dota2/matches/upcoming",
      params: {
        sort: "begin_at",
        page: "1",
        per_page: "5",
      },

      headers: {
        // 'Access-Control-Allow-Origin': true,
        accept: "application/json",
        authorization:
          "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setDota2Match(response.data);
        console.log(dota2Match);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleGetLolData() {
    const options = {
      method: "GET",
      url: "https://api.pandascore.co/lol/matches/upcoming",
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
        console.log(response.data);
        console.log(response.headers);
        setLolMatch(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  //___________________________________________________





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



  function handleGetValorant() {

    const options = {
      method: 'GET',
      url: 'https://api.pandascore.co/valorant/matches/upcoming',
      params: {
        sort: 'begin_at',
        page: '1',
        per_page: '5'
      },
      headers: {
        accept: 'application/json',
        authorization: 'Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setValorantMatch(response.data)
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  return (
    <div>
      <SiteHeader />

      {/* <TestingNavbar /> */}
      <GamesButtons
        csgoMatch={csgoMatch}
        lolMatch={lolMatch}
        dota2Match={dota2Match}
        user={user}
        valorantMatch={valorantMatch}
        onGetDota2Data={handleGetDota2}
        onGetLolData={handleGetLolData}
        onGetCsgoData={handleGetCSGOMatch}
        onGetValorantData={handleGetValorant} />
    </div>
  )
}


