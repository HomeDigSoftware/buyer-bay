import React from 'react';
import axios from "axios";
import TeamCard from './TeamCard.js';





export function LolButton({ setLolMatch }) {
  return (
    <div className='valorant-card'>
      <button className="data-btn" onClick={() => getLolMatchApiCall(setLolMatch)}>
        League of Legend
      </button>
    </div>
  );
}

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
  // console.log(" DATA :",data01)
  setLolMatch(dataText.upcoming);
}

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
//         "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
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

export function LolGetMatch({ lolMatch }) {
  return (
    <div>
      {console.log("LOL_______CARD ")}
      <div>
        {lolMatch.map((data) => (
          <TeamCard data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}


