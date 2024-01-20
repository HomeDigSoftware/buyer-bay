import React from 'react';
import axios from "axios";
import TeamCard from "./TeamCard.js"
import { data } from 'autoprefixer';
import supabase from '../../services/supabase.js';


// *** seat on the layout component (GamesButton.js)
// *** start the data fetch from panda score with a server-less function 
export function CsgoButton({setCsgoMatch}) {
  
  return (
    <div className='valorant-card'> 
      {/* <button className="data-btn" onClick={()=> getMatchNewApiCall(setCsgoMatch)}> */}
      <button className="data-btn" onClick={()=> fetchGameList(setCsgoMatch)}>
      {/* <button className="data-btn" onClick={()=> handleGetCSGOMatch(setCsgoMatch)}> */}
        CS GO
      </button>
    </div>
  );
}

// *** call the netlify server-less function that call the PandaScore API 
async function getMatchNewApiCall(setCsgoMatch){
  const server_getCsgoCall = (await fetch("/.netlify/functions/getMatchsApi" , {
    method: "POST" , 
    body: JSON.stringify({
      game: "csgo"
    })
  }))

  const data = await server_getCsgoCall.text();
  // const data01 = JSON.parse(server_getCall);
 const dataText = JSON.parse(data);
 

 // ***seting the data from the API call to 
 // ***pandaScore to the useState (setCsgoMatch)
 // ***that is on the (GameButton.js) script
   setCsgoMatch(dataText.upcoming);
}

// ***new get the game list from the app supabase DB 
// ***saving on api call and traffic to pandascore 
async function fetchGameList(setCsgoMatch){

  let { data, error } = await supabase
  .from('cs_go_game_list')
  .select('game_list')
  

   const db_data = data[0].game_list;
   // ***seting the data from the API call to 
   // ***pandaScore to the useState (setCsgoMatch)
   // ***that is on the (GameButton.js) script
   setCsgoMatch(db_data)
   
   db_data.map((game => (
    console.log('league DATA ' ,
    ' \n id : ' , game.league.id ,
    ' \n name : ' , game.league.name,  
    '\n slug : ' , game.league.slug , 
    '\n image_url : ' , game.league.image_url  )
   )));
 

}


export function CsgoGetMatch({ csgoMatch }) {
 

  return (
    <div>
      <div>
        {csgoMatch.map((data) => (
          <TeamCard data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}


// function handleGetCSGOMatch(setCsgoMatch) {
//   const options = {
//     method: "GET",
//     url: "https://api.pandascore.co/csgo/matches/upcoming",
//     params: {
//       sort: "begin_at",
//       page: "1",
//       per_page: "5",
//     },
//     headers: {
//       accept: "application/json",
//       authorization:
//         authorization: `Bearer ${process.env.REACT_APP_PANDASCORE_KEY}`
//     },
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//       setCsgoMatch(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }



