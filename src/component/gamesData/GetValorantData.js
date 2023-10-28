import React from 'react';
import TeamCard from './TeamCard';
import axios from 'axios';



export function ValorantButton({ setValorantMatch }) {
  return (
    <div className='valorant-card'>
      <button className="data-btn" onClick={() => handleGetValorant(setValorantMatch )}>
        Valorant
      </button>
    </div>
  );
}



function handleGetValorant(setValorantMatch) {
  const pandaToken = "zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0"

  const options = {
    method: 'GET',
    url: `https://api.pandascore.co/valorant/matches/upcoming?token=${pandaToken}`,
    params: {
      sort: 'begin_at',
      page: '1',
      per_page: '5'
    },
    headers: {
    //  'https://api.pandascore.co/videogames?token=PLACEHOLDER_TOKEN_VALUE' \
      accept: 'application/json',
      // authorization: `Bearer ${pandaToken}`,
    //  withCredentials: true,
   //   'Access-Control-Allow-Origin': 'https//homedigsoftware.com',
    //       curl --request GET \
    //  --url 'https://api.pandascore.co/videogames' \
    //  --header 'Accept: application/json' \
    //  --header 'Authorization: zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
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



export function ValorantGetMatch({ valorantMatch }) {
  return (
    <div className='valor-card'>
      <div className=" clear-both text-center iteam-align-center justify-center ">
        {valorantMatch.map((data) => (
          <TeamCard data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}


