import React from 'react';
import TeamCard from './TeamCard.js';
import axios from 'axios';



export function ValorantButton({ setValorantMatch }) {
  return (
    <div className='valorant-card'>
      {/* <button className="data-btn" onClick={() => handleGetValorant(setValorantMatch )}> */}
      <button className="data-btn" onClick={() => onGetData(setValorantMatch )}>
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
  console.log(theData.upcoming);
  const text = JSON.parse(theData)
  console.log(text.upcoming);
  setValorantMatch(text.upcoming)

  // console.log(JSON.parse(server_response))
  // let myText = await myObject.text();
  // myDisplay(myText);

 //setdata(JSON.stringify(server_response))
 


} 





//___________________________________________________________________________________________
function handleGetValorant(setValorantMatch) {
  const pandaToken = "zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0"
  const url = `https://api.pandascore.co/valorant/matches/upcoming?token=${pandaToken}`;
  const options = {
    method: 'GET',
    url: `https://api.pandascore.co/valorant/matches/upcoming?token=${pandaToken}`,
    params: {
      sort: 'begin_at',
      page: '1',
      per_page: '5'
    },
    headers: {
      accept: "application/json",
      authorization:
        "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
    },
    // headers: {
    //  'https://api.pandascore.co/videogames?token=PLACEHOLDER_TOKEN_VALUE' \
      // accept: 'application/json',
      // authorization: `Bearer ${pandaToken}`,
    //  withCredentials: true,
   //   'Access-Control-Allow-Origin': 'https//homedigsoftware.com',
    //       curl --request GET \
    //  --url 'https://api.pandascore.co/videogames' \
    //  --header 'Accept: application/json' \
    //  --header 'Authorization: zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
    
// const myoptions = {
//   headers: {
//     "Authorization": "Bearer sdswmaiqwasae*********",
//     "Content-Type": "application/json"
//   }
}
    //__________________________________________________________________________________________________
// fetch(url, myoptions)
//   .then( res => res.json() )
//   .then( data => console.log(data) )
//      }
//   };

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


