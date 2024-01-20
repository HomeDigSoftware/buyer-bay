import React from 'react';
import axios from "axios";
import supabase from '../../services/supabase.js';
import TeamCard from './TeamCard.js';


// *** seat on the layout component (GamesButton.js)
// *** start the data fetch from panda score with a server-less function 
export function Dota2Button({ setDota2Match }) {
  return (
    <div className='valorant-card'>
      {/* <button className="data-btn" onClick={()=> getDota2MatchApiCall(setDota2Match)}> */}
      <button className="data-btn" onClick={()=> fetchGameList(setDota2Match)}>
        DOTA 2
      </button>
    </div>
  );
}


// *** call the netlify server-less function that call the PandaScore API 
async function getDota2MatchApiCall(setDota2Match){
  const server_getDota2Call = (await fetch("/.netlify/functions/getMatchsApi" , {
    method: "POST" , 
    body: JSON.stringify({
      game: "dota2"
    })
  }))

  const data = await server_getDota2Call.text();
  // const data01 = JSON.parse(server_getCall);
 const dataText = JSON.parse(data);
  // console.log(" DATA :",data01)

  // ***seting the data from the API call to 
 // ***pandaScore to the useState (setDota2Match)
 // ***that is on the (GameButton.js) script

   setDota2Match(dataText.upcoming);
}

// ***new get the game list from the app supabase DB 
// ***saving on api call and traffic to pandascore 
async function fetchGameList(setDota2Match){

  let { data, error } = await supabase
  .from('dota_2_game_list')
  .select('game_list')
  

   const db_data = data[0].game_list;


    // ***seting the data from the API call to 
   // ***pandaScore to the useState (setCsgoMatch)
   // ***that is on the (GameButton.js) script
  setDota2Match(db_data)
  
  db_data.map((game => (
    console.log('league DATA ' ,
    ' \n id : ' , game.league.id ,
    ' \n name : ' , game.league.name,  
    '\n slug : ' , game.league.slug , 
    '\n image_url : ' , game.league.image_url  )
   )));
 

}

export function Dota2GetMatch({ dota2Match }) {
  return (
    <div>
      <div>
        {dota2Match.map((data) => (
          <TeamCard data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}



// function handleGetDota2(setDota2Match) {
//   const options = {
//     method: "GET",
//     url: "https://api.pandascore.co/dota2/matches/upcoming",
//     params: {
//       sort: "begin_at",
//       page: "1",
//       per_page: "5",
//     },

//     headers: {
//       // 'Access-Control-Allow-Origin': true,
//       accept: "application/json",
//       authorization:
//          authorization: `Bearer ${process.env.REACT_APP_PANDASCORE_KEY}`
//     }
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       setDota2Match(response.data);
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }




// function Dota2({ data }) {
//   console.log(data);
//   return (

//     <div className="main-card">
//       <div className="fifa-matchs flex flex-row">


//         {/* <h1 className="title">{data.name}</h1> */}



//         {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
//         {/* <p>{data.streams_list[0]?.language}</p> */}

//         <div className="teams-card items-center flex flex-row gap-6  m-auto">

//           <div className="team-1 text-center">
//             <img
//               className="team1-image w-20 h-20 "
//               src={data.opponents[0]?.opponent.image_url}
//               alt={data.id} />
//             <h3 className="teams-names">
//               {data.opponents[0]?.opponent.name}
//             </h3>
//           </div>

//           <div className="data text-center">
//             <h2 className="game-name">{data.videogame.name}</h2>
//             <h3 className="time">{data.begin_at}</h3>
//             <p className="game-data ">
//               {data.match_type} : {data.number_of_games} <br />
//               <label> game id: {data.games[0]?.id}</label>
//             </p>
//             <p className="links">
//               {/* {data.streams_list[0]?.embed_url} */}
//               <a className="links" href={data.streams_list[0]?.raw_url}>

//                 <label>channle live</label>
//               </a>
//             </p>
//           </div>

//           <div className=" team-2 text-center ">

//             <img
//               className="team2-image w-20 h-20 "
//               src={data.opponents[1]?.opponent.image_url}
//               alt={data.id} />
//             <h3 className="teams-names">
//               {data.opponents[1]?.opponent.name}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
