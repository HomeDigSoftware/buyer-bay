import React from 'react';
import axios from "axios";
import TeamCard from "./TeamCard"



export function CsgoButton({setCsgoMatch}) {
  
  return (
    <div className='valorant-card'>
      <button className="data-btn" onClick={()=> handleGetCSGOMatch(setCsgoMatch)}>
        CS GO
      </button>
    </div>
  );
}


function handleGetCSGOMatch(setCsgoMatch) {
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


export function CsgoGetMatch({csgoMatch}) {
 

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

