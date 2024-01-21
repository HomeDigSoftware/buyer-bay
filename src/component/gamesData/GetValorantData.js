import React, { useState } from 'react';
import TeamCard from './TeamCard.js';
import supabase from '../../services/supabase.js';
import axios from 'axios';



// *** seat on the layout component (GamesButton.js)
// *** start the data fetch from panda score with a server-less function 
export function ValorantButton({ setValorantMatch }) {
  return (
    <div className='valorant-card'>
      {/* <button className="data-btn" onClick={() => handleGetValorant(setValorantMatch )}> */}
      <button className="data-btn" onClick={() => fetchGameList(setValorantMatch )}>
      {/* <button className="data-btn" onClick={() => onGetData(setValorantMatch )}> */}
        Valorant
      </button>
    </div>
  );
}


// , {
//   method: 'POST',
//   body: JSON.stringify({
//     region: 'hoenn'
//   })


// *** call the netlify server-less function that call the PandaScore API 
async function onGetData(setValorantMatch){
  // console.log("start")
  const server_response = await fetch('/.netlify/functions/getMatchsApi' , {
    method: "POST" , 
    body: JSON.stringify({
      game: "valorant"
    })
  } )
  //  .then(server_response => server_response.text);
  const theData = await server_response.text();
  // console.log("the data ========== " , theData.upcoming);
  const text = JSON.parse(theData)
  // console.log(text.upcoming);

  // ***seting the data from the API call to 
 // ***pandaScore to the useState (setValorantMatch)
 // ***that is on the (GameButton.js) script
  setValorantMatch(text.upcoming)

 

} 

// ***new get the game list from the app supabase DB 
// ***saving on api call and traffic to pandascore 
async function fetchGameList(setValorantMatch){

  let { data, error } = await supabase
  .from('valorant_game_list')
  .select('game_list')
  

   const db_data = data[0].game_list;
 
   // ***seting the data from the API call to 
   // ***pandaScore to the useState (setCsgoMatch)
   // ***that is on the (GameButton.js) script
   setValorantMatch(db_data)

   db_data.map((game => (
    console.log('league DATA ' ,
    ' \n id : ' , game.league.id ,
    ' \n name : ' , game.league.name,  
    '\n slug : ' , game.league.slug , 
    '\n image_url : ' , game.league.image_url  )
   )));
 

}


export function ValorantGetMatch({ valorantMatch }) {
  const [list , setList] = useState({});
  const the_data = "";
  const date = new Date();
  const curr_day = date.getDate(date);
  const curr_hour = date.getHours(date);
  const curr_minute = date.getMinutes(date)
  //valorantMatch.map((data) =>             {if(data.begin_at.slice(11 ,13) >= curr_hour && data.begin_at.slice(8 ,10) >= curr_day)
  //console.log(" current hour && minute " , data.begin_at.slice(11, 13), curr_hour , data.begin_at.slice(14, 16), curr_minute)
  return (
    <div className='valor-card'>
      <div className=" clear-both text-center iteam-align-center justify-center ">
         
         
         {valorantMatch.map((data) =>  (<TeamCard data={data} key={data.id} />))}
     
      </div>
    </div>
  );
}


