import React, { useState , useEffect } from 'react';
import BattingPanel from './BattingPanel.js';
import { useAsyncValue } from 'react-router-dom';
import supabase from '../../services/supabase.js';
import "../../App.css"
import OpenBatsCard from './OpenBatsCard.js';



export default function TeamCard({ data }) {
  const [newData , setNewData] = useState(false)
  const [showPanel , setShowPanel] = useState(false);
  const [matchOpenBats , setMatchOpenBats ] = useState("");
  const [haveOpenBats , setHaveOpenBats] = useState(false);
  const [user , setUser] = useState("");
  //______________________________sorting the data__________________________________
  ;
  // const the_data = "";
  const date = new Date();
  const curr_day = date.getDate(date);
  const curr_hour = date.getHours(date);
  const curr_minute = date.getMinutes(date);
  const match_day = data.begin_at?.slice(8 , 10);
  const match_hour = data.begin_at?.slice(11 , 13 );

  
  return (
    <>
  { showPanel? <div> {haveOpenBats? <div><OpenBats  matchOpenBats={matchOpenBats} matchData={data} setHaveOpenBats={setHaveOpenBats} setShowPanel={setShowPanel}/> </div> : <BattingPanel setShowPanel={setShowPanel} data={data} showPanel={showPanel}/>} </div> : 
    //   <div className="main-card" onClick={() => setShowPanel(true)}>
  
      <div className="main-card" onClick={() => getBats(setShowPanel , data ,setMatchOpenBats, setHaveOpenBats )}> 
       <div className="fifa-matchs flex flex-row">
        <div className="teams-card flex flex-row gap-6  m-auto">
          <div className="team-1 text-center">
            <img
              className="team1-image w-20 h-20 m-auto"
              src={data.opponents[0]?.opponent.image_url}
              alt={data.id} />
            <h3 className="teams-names">
              {data.opponents[0]?.opponent.name}
            </h3>
          </div>
          <div className="data text-center">
            <h2 className="game-name">{data.videogame.name}</h2>
            <h6 style={{color:'white'}}> league: {data.league.name}</h6>
            <h3 className="time">{data.begin_at}</h3>
            <p className="game-data ">
              {data.match_type} : {data.number_of_games} <br />
              <label> game id: {data.games[0]?.id}</label> <br />
            </p>
            <p className="links">
              <a className="links" href={data.streams_list[0]?.raw_url}>
                <label>channle live</label>
              </a>
            </p>
          </div>
          <div className=" team-2 text-center ">
            <img
              className="team2-image w-20 h-20 m-auto"
              src={data.opponents[1]?.opponent.image_url}
              alt={data.id} />
            <h3 className="teams-names">
              {data.opponents[1]?.opponent.name}
            </h3>
          </div>
        </div>
      </div>
    </div> }
    </>
  );
}




async function getBats( setShowPanel ,matchdata , setMatchOpenBats , setHaveOpenBats){
  
 
  let count = 0;

  let {data: open_bats , error} = await supabase         
  .from('bat_list')
  .select()
  .eq("match_ok" , false)

  // console.log( "Match slug  = ",  matchdata , " match amount = " , open_bats.match_ok);
  if(open_bats.length >= 0){
    
    setMatchOpenBats(open_bats);
    open_bats.map((bat) => {
      if (bat.match_slug === matchdata.slug ) {
     
        count++;
        // console.log( " db match OK =  " ,  bat.match_ok)
        // console.log( " db open bat slug" , bat.match_slug )
        // console.log( " match DB id" , bat.id)
        // console.log( " db bat amount " , bat.tokens)
        // console.log( " oppnent chosen team " , bat.chosen_team_id)     
        // console.log( " current match slug " , matchdata.slug)
       setThePanel(setHaveOpenBats);
       
     }    
     else{
      setShowPanel(true)
     } 
   })
  }
  else {
    // console.log(" show bating panel"); //bat.match_slug 
    setShowPanel(true)
  }
 
}
function setThePanel(setHaveOpenBats){
  setHaveOpenBats(false)
  setHaveOpenBats(true)
  // console.log("set the panel")
}

function OpenBats({matchOpenBats ,matchData , setHaveOpenBats , setShowPanel}) {
 

  return (
    <div className='open-batting-background'>
      <div >
        {matchOpenBats.map((bat) => 
          <OpenBatsCard matchOpenBats={bat} matchData={matchData} setHaveOpenBats={setHaveOpenBats} setShowPanel={setShowPanel} key={bat.id} />
        
        )}
      </div>
      {/* style={{display:"inline" }} */}
      <div >
        <button onClick={() => setHaveOpenBats(false)} className='token-btn' style={{width: "80%"}}>place new bat</button>
        <button onClick={() => (setShowPanel(false) , setHaveOpenBats(false))} style={{margin:"10px" , display:"inline" , width:"10%" }} className='token-btn' > X </button>
      </div>
    </div>
  );
}



