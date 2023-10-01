import React from 'react';
import Logo from './logo-package-GOLD/png/logo-no-background.png'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import axios from "axios";
import './App.css'
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from "./component/ChatBox";
import Welcome from "./component/Welcome";

import NavBar from "./component/Navbar";
// import ChatBox from "./components/ChatBox";
// import Welcome from "./components/Welcome";
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';



export default function App_v2() {
  const [user] = useAuthState(auth);
  const [upcomingData, setUpcomingData] = useState([]);
  const [valorantMatch , setValorantMatch] = useState([]);
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

  function handleGetDota2() {
    const options = {
      method: "GET",
      url: "https://api.pandascore.co/dota2/matches/upcoming",
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



   function handleGetValorant(){

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
      <Testing 
          csgoMatch={csgoMatch} 
          lolMatch={lolMatch} 
          dota2Match={dota2Match} 
          user={user} 
          valorantMatch={valorantMatch}
          onGetDota2Data={handleGetDota2} 
          onGetLolData={handleGetLolData}
          onGetCsgoData={handleGetCSGOMatch}
          onGetValorantData={handleGetValorant}/>
        {/* <MatchList
          upcomingData={upcomingData}
          onGetUpcoming={handleGetUpcoming}
        /> */}
               
      {/* <MainPage /> */}
      {/* <Container className="p-3"> top container
              <Container className="p-5 mb-4 bg-light rounded-3"></Container>
                  second container
            </Container > */}
      {/* <BasicExample />
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script> 
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script> 
  */}
  
    </div>
  )
}

function SiteHeader(){
 
  return(

    <header className="border-bottom lh-1 py-3">
    <div className="main-header row flex-nowrap justify-content-between align-items-center text-center">
      <div className="col-3 pt-1">
       
      </div>
      <div className="logo-cont col-6 text-center"> 
      <a className="link-secondary" href="#">Subscribe</a>
        <img className='logo' src={Logo} alt='logo'/>
       
      </div>
      <div className="col-3 d-flex justify-content-end pr-5">
        <a className="link-secondary-icon" href="#" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
        </a>
        <a className="btn btn-sm " href="#">Sign up</a>
      </div>
    </div>
  </header>
  )
}

function ValorantButton({onGetValorantData}){
  return(
    <div className='valorant-card'>
    <button className="data-btn" onClick={onGetValorantData}>
      Valorant
    </button>
    </div>
  )
}

function CsgoButton({onGetCsgoData}){
  return(
    <div className='valorant-card'>
    <button className="data-btn" onClick={onGetCsgoData}>
      CS GO
    </button>
    </div>
  )
}

function LolButton({onGetLolData}){
  return(
    <div className='valorant-card'>
    <button className="data-btn" onClick={onGetLolData}>
      League of Legend
    </button>
    </div>
  )
}

function Dota2Button({onGetDota2Data}){
  return(
    <div className='valorant-card'>
    <button className="data-btn" onClick={onGetDota2Data}>
      DOTA 2
    </button>
    </div>
  )
}


function CsgoGetMatch({ csgoMatch, onGetCsgoData }) {
  return (
    <div>
      {/* <button className="data-btn" onClick={onGetCsgoData}>
        CS-GO
      </button> */}
      <div>
        {csgoMatch.map((data) => (
          <CsGo data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}

function CsGo({ data }) {
  //  console.log(data)
  return (
    <div className="main-card">
    <div className="fifa-matchs flex flex-row">
     
     
      {/* <h1 className="title">{data.name}</h1> */}
     
      

      {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
      {/* <p>{data.streams_list[0]?.language}</p> */}
    
      <div className="teams-card flex flex-row gap-6  m-auto">
     
      <div className="team-1 text-center">
      <img
        className="team1-image w-20 h-20 "
        src={data.opponents[0]?.opponent.image_url}
        alt={data.id}
      />
       <h3 className="teams-names">
        {data.opponents[0]?.opponent.name}
      </h3>
      </div>

      <div className="data text-center">
      <h2 className="game-name">{data.videogame.name}</h2>
      <h3 className="time">{data.begin_at}</h3>
      <p className="game-data ">
        {data.match_type} : {data.number_of_games} <br />
        <label> game id: {data.games[0]?.id}</label>
      </p>
        <p className="links">
        {/* {data.streams_list[0]?.embed_url} */}
        <a className="links" href={data.streams_list[0]?.raw_url}>
        
          <label>channle live</label>
        </a>
      </p>
      </div>
      
      <div className=" team-2 text-center ">
     
      <img
        className="team2-image w-20 h-20 "
        src={data.opponents[1]?.opponent.image_url}
        alt={data.id}
      />
       <h3 className="teams-names">
        {data.opponents[1]?.opponent.name}
      </h3>
      </div>
    </div>
    </div>
  </div> 
  );
}


function ValorantGetMatch({ valorantMatch, onGetValorantData }) {
  return (
    <div className='valor-card'>
      {/* <Button className="data-btn" onClick={onGetData}>
        Valorant
      </Button> */}
      <div className=" clear-both text-center iteam-align-center justify-center ">
        {valorantMatch.map((data) => (
          <Valorant data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}




function Valorant({ data }) {
  console.log(data);
  return (
    <div className="main-card">
           <div className="fifa-matchs flex flex-row">
           
           
             {/* <h1 className="title">{data.name}</h1> */}
           
            
    
             {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
             {/* <p>{data.streams_list[0]?.language}</p> */}
          
             <div className="teams p-4 items-center flex flex-row gap-6  m-auto">
           
             <div className="team-1 text-center">
             <img
              className="team1-image w-20 h-20 "
              src={data.opponents[0]?.opponent.image_url}
              alt={data.id}
            />
             <h3 className="teams-names">
              {data.opponents[0]?.opponent.name}
            </h3>
            </div>
    
            <div className="data text-center">
            <h2 className="game-name">{data.videogame.name}</h2>
            <h3 className="time">{data.begin_at}</h3>
            <p className="game-data ">
              {data.match_type} : {data.number_of_games} <br />
              <label> game id: {data.games[0]?.id}</label>
            </p>
              <p className="links">
              {/* {data.streams_list[0]?.embed_url} */}
              <a className="links" href={data.streams_list[0]?.raw_url}>
              
                <label>channle live</label>
              </a>
            </p>
            </div>
            
            <div className="team-2 text-center self-end">
           
            <img
              className="team2-image w-20 h-20 "
              src={data.opponents[1]?.opponent.image_url}
              alt={data.id}
            />
             <h3 className="teams-names">
              {data.opponents[1]?.opponent.name}
            </h3>
            </div>
          </div>
          </div>
        </div>
  );
}


  function LolGetMatch({ lolMatch, onGetMatch }) {
    return (
      <div>
        {/* <button className="data-btn" onClick={onGetMatch}>
          League Of Legend
        </button> */}
        <div>
          {lolMatch.map((data) => (
            <Lol data={data} key={data.id} />
          ))}
        </div>
      </div>
    );
  }
  
  function Lol({ data }) {
    console.log(data);
    return (

      <div className="main-card">
      <div className="fifa-matchs flex flex-row">
       
       
        {/* <h1 className="title">{data.name}</h1> */}
       
        

        {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
        {/* <p>{data.streams_list[0]?.language}</p> */}
      
        <div className="teams-card items-center flex flex-row gap-6  m-auto">
       
        <div className="team-1 text-center">
        <img
          className="team1-image w-20 h-20 "
          src={data.opponents[0]?.opponent.image_url}
          alt={data.id}
        />
         <h3 className="teams-names">
          {data.opponents[0]?.opponent.name}
        </h3>
        </div>

        <div className="data text-center">
        <h2 className="game-name">{data.videogame.name}</h2>
        <h3 className="time">{data.begin_at}</h3>
        <p className="game-data ">
          {data.match_type} : {data.number_of_games} <br />
          <label> game id: {data.games[0]?.id}</label>
        </p>
          <p className="links">
          {/* {data.streams_list[0]?.embed_url} */}
          <a className="links" href={data.streams_list[0]?.raw_url}>
          
            <label>channle live</label>
          </a>
        </p>
        </div>
        
        <div className="team-2 text-center ">
       
        <img
          className="team2-image w-20 h-20 "
          src={data.opponents[1]?.opponent.image_url}
          alt={data.id}
        />
         <h3 className="teams-names">
          {data.opponents[1]?.opponent.name}
        </h3>
        </div>
      </div>
      </div>
    </div>




    );
  }
  
  function Dota2GetMatch({ dota2Match, onGetMatch }) {
    return (
      <div>
        {/* <button className="data-btn" onClick={onGetMatch}>
          DOTA 2
        </button> */}
        <div>
          {dota2Match.map((data) => (
            <Dota2 data={data} key={data.id} />
          ))}
        </div>
      </div>
    );
  }
  
  function Dota2({ data }) {
    console.log(data);
    return (
     
      <div className="main-card">
      <div className="fifa-matchs flex flex-row">
       
       
        {/* <h1 className="title">{data.name}</h1> */}
       
        

        {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
        {/* <p>{data.streams_list[0]?.language}</p> */}
      
        <div className="teams-card items-center flex flex-row gap-6  m-auto">
       
        <div className="team-1 text-center">
        <img
          className="team1-image w-20 h-20 "
          src={data.opponents[0]?.opponent.image_url}
          alt={data.id}
        />
         <h3 className="teams-names">
          {data.opponents[0]?.opponent.name}
        </h3>
        </div>

        <div className="data text-center">
        <h2 className="game-name">{data.videogame.name}</h2>
        <h3 className="time">{data.begin_at}</h3>
        <p className="game-data ">
          {data.match_type} : {data.number_of_games} <br />
          <label> game id: {data.games[0]?.id}</label>
        </p>
          <p className="links">
          {/* {data.streams_list[0]?.embed_url} */}
          <a className="links" href={data.streams_list[0]?.raw_url}>
          
            <label>channle live</label>
          </a>
        </p>
        </div>
        
        <div className=" team-2 text-center ">
       
        <img
          className="team2-image w-20 h-20 "
          src={data.opponents[1]?.opponent.image_url}
          alt={data.id}
        />
         <h3 className="teams-names">
          {data.opponents[1]?.opponent.name}
        </h3>
        </div>
      </div>
      </div>
    </div>
    );
  }
  
 

function Testing({csgoMatch ,dota2Match , lolMatch , valorantMatch , onGetValorantData , user , onGetCsgoData , onGetDota2Data , onGetLolData}) {
  return (
    <div className='container-fluid text-center h-10 justify-center '>

      <div className=' row ' style={{ height: "80px" }}>
        <div className='col-3'>one/1 </div>
        <div className='col-6'>LOGO</div>
        <div className='col-3'>Accunte Status </div>
      </div>


      <div className=' row' style={{ height: "650px" }}>
        <div className=' games-select col-3 ' >
          <ValorantButton onGetValorantData={onGetValorantData} />
        <CsgoButton onGetCsgoData={onGetCsgoData}/>
        <LolButton onGetLolData={onGetLolData}/>
        <Dota2Button onGetDota2Data={onGetDota2Data}/>
          two/1 <SideList /></div>
        <div className='col-5'>
          <div className='row ' style={{ height: "60px" }}> 
          <h2> Up-Coming Games </h2> </div>
          <div className='match-cont row m-auto' style={{ height: "550px" }}>
        <ValorantGetMatch valorantMatch={valorantMatch} onGetValorantData={onGetValorantData} />
        <CsgoGetMatch csgoMatch={csgoMatch} onGetCsgoData={onGetCsgoData} />
        <Dota2GetMatch dota2Match={dota2Match} onGetDota2Data={onGetDota2Data} />
        <LolGetMatch lolMatch={lolMatch} onGetLolData={onGetLolData} />
        {/* <ValorantGetMatch valorantMatch={valorantMatch} onGetMatch={handleGetValorant} /> */}
             </div>
        </div>
        <div className='loby-cont col-4'style={{ height: "600px" }}> 
        <div className='row ' style={{ height: "60px" }}> 
          <h2> Chat  </h2> </div>
        <NavBar />
       
       {!user ? <Welcome /> :   <ChatBox /> }
      </div>
      </div>

      <div className=' row' style={{ height: "160px" }}>
        <div className='col-3'>three/1</div>
        <div className='col-9'>three/2</div>
      </div>

    </div>
  )
}


function SideList(){
  return(
    <div className="col-4 h-70 ">

    {/* <div class="card" style={{ width: "20rem" }}>
      <div class="card-header">
        Featured
      </div>
      <ul class=" container list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div> */}
    <div class="d-flex flex-column align-items-center flex-shrink-0 " >

    
  </div>
  </div>
  )
}
