import React from 'react';
import ChatBox from "../chat/ChatBox";
import Welcome from "../chat/Welcome";
import NavBar from "../firebase/Navbar";

import { Dota2Button, Dota2GetMatch } from './GetDota2Data';
import { LolButton, LolGetMatch } from './GetLolData';
import { CsgoButton, CsgoGetMatch } from './GetCsgoData';
import { ValorantButton, ValorantGetMatch } from './GetValorantData';

export function GamesButtons({ csgoMatch, dota2Match, lolMatch, valorantMatch, onGetValorantData, user, onGetCsgoData, onGetDota2Data, onGetLolData }) {
  return (
    <div className='container-fluid text-center h-10 justify-center '>

      <div className=' row ' style={{ height: "80px" }}>
        <div className='col-3'>one/1 </div>
        <div className='col-6'>LOGO</div>
        <div className='col-3'>Accunte Status </div>
      </div>


      <div className=' row' style={{ height: "650px" }}>
        <div className=' games-select col-3 '>
          <ValorantButton onGetValorantData={onGetValorantData} />
          <CsgoButton onGetCsgoData={onGetCsgoData} />
          <LolButton onGetLolData={onGetLolData} />
          <Dota2Button onGetDota2Data={onGetDota2Data} />
          </div>
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
        <div className='loby-cont col-4' style={{ height: "600px" }}>
          <div className='row ' style={{ height: "60px" }}>
            <h2> Chat  </h2> </div>
          <NavBar />

          {!user ? <Welcome /> : <ChatBox />}
        </div>
      </div>

      <div className=' row' style={{ height: "160px" }}>
        <div className='col-3'>three/1</div>
        <div className='col-9'>three/2</div>
      </div>

    </div>
  );
}
