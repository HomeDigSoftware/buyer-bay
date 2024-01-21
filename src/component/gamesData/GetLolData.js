import React from 'react';
import axios from "axios";
import supabase from '../../services/supabase.js';
import TeamCard from './TeamCard.js';




// *** seat on the layout component (GamesButton.js)
// *** start the data fetch from panda score with a server-less function 
export function LolButton({ setLolMatch }) {
  return (
    <div className='valorant-card'>
      <button className="data-btn" onClick={() => fetchGameList(setLolMatch)}>
      {/* <button className="data-btn" onClick={() => getLolMatchApiCall(setLolMatch)}> */}
        League of Legend
      </button>
    </div>
  );
}

// *** call the netlify server-less function that call the PandaScore API 
async function getLolMatchApiCall(setLolMatch){
  console.log("fetching Data .... >>>")
  const server_getLolCall = (await fetch("/.netlify/functions/getMatchsApi" , {
    method: "POST" , 
    body: JSON.stringify({
      game: "lol"
    })
  }))

  const data = await server_getLolCall.text();
  // const data01 = JSON.parse(server_getCall);
 const dataText = JSON.parse(data);
  
 // ***seting the data from the API call to 
 // ***pandaScore to the useState (setLolMatch)
 // ***that is on the (GameButton.js) script

  setLolMatch(dataText.upcoming);
 
}

// ***new get the game list from the app supabase DB 
// ***saving on api call and traffic to pandascore 
async function fetchGameList(setLolMatch){

  let { data, error } = await supabase
  .from('lol_game_list')
  .select('game_list')
  

   const db_data = data[0].game_list;
 

    // ***seting the data from the API call to 
   // ***pandaScore to the useState (setCsgoMatch)
   // ***that is on the (GameButton.js) script
  setLolMatch(db_data)

  db_data.map((game => (
    console.log('league DATA ' ,
    ' \n id : ' , game.league.id ,
    ' \n name : ' , game.league.name,  
    '\n slug : ' , game.league.slug , 
    '\n image_url : ' , game.league.image_url  )
   )));
 

}


export function LolGetMatch({ lolMatch }) {
  return (
    <div>
      {/* {console.log("LOL_______CARD ")} */}
      <div>
        {lolMatch.map((data) => (
          <TeamCard data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}

// async function stripNewUserTest(){
//   const server_stripCall = (await fetch("./netlify/functions/stripeNewCustomer", {
//     method:"POST" ,

//   }))
//   const strip_res = await server_stripCall.text();
//   // const stripedata = JSON.parse(strip_res)
//   console.log("stripedata" , strip_res);
// }

// function handleGetLolData(setLolMatch) {
//   const options = {
//     method: "GET",
//     url: "https://api.pandascore.co/lol/matches/upcoming",
//     params: {
//       sort: "begin_at",
//       page: "1",
//       per_page: "5",
//     },
//     headers: {
//       accept: "application/json",
//       authorization:
//          authorization: `Bearer ${process.env.REACT_APP_PANDASCORE_KEY}`
//     },
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//       console.log(response.headers);
//       setLolMatch(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }



