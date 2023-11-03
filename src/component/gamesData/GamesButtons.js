import React from 'react';
import ChatBox from "../chat/ChatBox.js";
import Welcome from "../chat/Welcome";
import NavBar from "../firebase/Navbar.js";
import SupabaseLogin from "../chat/SupabaseLogin.js"
import { useState } from 'react';
import { Dota2Button, Dota2GetMatch } from './GetDota2Data.js';
import { LolButton, LolGetMatch } from './GetLolData.js';
import { CsgoButton, CsgoGetMatch } from './GetCsgoData.js';
import { ValorantButton, ValorantGetMatch } from './GetValorantData.js';

export function GamesButtons({  user}) {
  const [csgoMatch, setCsgoMatch] = useState([]);
  const [lolMatch, setLolMatch] = useState([]);
  const [dota2Match, setDota2Match] = useState([]);
  const [valorantMatch, setValorantMatch] = useState([]);

  return (
    <div className='container-fluid text-center h-10 justify-center '>

      <div className=' row ' style={{ height: "80px" }}>
        <div className='col-3' style={{ color: "blue"}}> </div>
        <div className='col-6'></div>
        <div className='col-3'> </div>
      </div>


      <div className=' row' style={{ height: "650px" }}>
        <div className=' games-select col-3 '>
          <ValorantButton setValorantMatch={setValorantMatch} />
          <CsgoButton setCsgoMatch={setCsgoMatch}/>
          <LolButton setLolMatch={setLolMatch} />
          <Dota2Button setDota2Match={setDota2Match} />
          </div>
     
        <div className='col-5'>
          <div className='row ' style={{ height: "60px" }}>
                   
            <h2> Up-Coming Games </h2> </div>
               
          <div className='match-cont row m-auto' style={{ height: "550px" }}>
            <ValorantGetMatch valorantMatch={valorantMatch} />
            <CsgoGetMatch csgoMatch={csgoMatch}  />
            <Dota2GetMatch dota2Match={dota2Match} />
            <LolGetMatch lolMatch={lolMatch}  />
            {/* <ValorantGetMatch valorantMatch={valorantMatch} onGetMatch={handleGetValorant} /> */}
          </div>
        </div>
     
     
        <div className='loby-cont col-4' style={{ height: "600px" }}>
          <div className='row ' style={{ height: "60px" }}>
            <h2> Chat  </h2> </div>
          <NavBar />

          {!user ? <><SupabaseLogin /> </>: <ChatBox />}
        </div>
      </div>

      <div className=' row' style={{ height: "160px" }}>
        <div className='col-3'></div>
        <div className='col-9'></div>
      </div>

    </div>
  );
}
