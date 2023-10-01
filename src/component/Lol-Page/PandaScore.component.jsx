import React, { useState } from "react";
import axios from "axios";
//import "../../App.css";
//import { render } from "node-sass";

export default function PandaScore() {
  // const [data, setData] = useState([]);
 // const [upcomingData, setUpcomingData] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [leagueData, setLeagueData] = useState([]);
  const [fifaData, setFifaData] = useState([]);
  // const [csgoMatch, setCsgoMatch] = useState([]);
  // const [dota2Match, setDota2Match] = useState([]);
  // const [lolMatch, setLolMatch] = useState([]);
  // const [valorantMatch , setValorantMatch] = useState([]);

  function handleGetFifaData (){

    // const getData = await axios.get(
    //   method: "GET",
    //   url: "https://api.pandascore.co/fifa/matches/upcoming",
    //   params: {
    //     page: "10",
    //     per_page: "50",
    //   },
    //   headers: {
    //     accept: "application/json",
    //     authorization:
    //       "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
    //   },
    // };
    // )

    const fifaOptions =  {
      method: "GET",
      url: "https://api.pandascore.co/fifa/matches/upcoming",
      params: {
        page: "10",
        per_page: "50",
      },
      headers: {
        accept: "application/json",
        authorization:
          "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
      },
    };

    axios
      .request(fifaOptions)
      .then(function (response) {
        setFifaData(response.data);
        console.log(fifaData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleGetLeagues() {
    const LeagueOptions = {
      method: "GET",
      url: "https://api.pandascore.co/leagues",
      params: { sort: "id", page: "1", per_page: "5" },
      headers: {
        accept: "application/json",
        authorization:
          "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
      },
    };

    axios
      .request(LeagueOptions)
      .then(function (response) {
        setLeagueData(response.data);
        console.log(leagueData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleGetLive() {
    const optionsLive = {
      method: "GET",
      url: "https://api.pandascore.co/lives",
      params: { page: "1", per_page: "20" },
      headers: {
        accept: "application/json",
        authorization:
          "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
      },
    };

    axios
      .request(optionsLive)
      .then(function (response) {
        setLiveData(response.data);
        console.log(" this live data", liveData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // function handleGetUpcoming() {
  //   const options = {
  //     method: "GET",
  //     url: "https://api.pandascore.co/matches/upcoming",
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
  //       setUpcomingData(response.data);

  //       //  console.log(fifaData);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  // function handleGetCSGOMatch() {
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
  //         "Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0",
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

  // function handleGetDota2() {
  //   const options = {
  //     method: "GET",
  //     url: "https://api.pandascore.co/dota2/matches/upcoming",
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
  //       setDota2Match(response.data);
  //       console.log(dota2Match);
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  // function handleGetLolData() {
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
  //       setLolMatch(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

//   function handleGetValorant(){

// const options = {
//   method: 'GET',
//   url: 'https://api.pandascore.co/valorant/matches/upcoming',
//   params: {
//     sort: 'begin_at',
//     page: '1',
//     per_page: '5'
//   },
//   headers: {
//     accept: 'application/json',
//     authorization: 'Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
//   }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     setValorantMatch(response.data)
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
//   }


  return (
    <div>
      {/* <div>
      <button onClick={handleLeaguesGet}>click</button>
      hi there
      {data.map((d, i) => (
        <div>
          {data[i].name} <img className="team-card" src={data[i].image_url} />{" "}
        </div>
      ))}
    </div> */}
      <div>
        {/* <MatchList
          upcomingData={upcomingData}
          onGetUpcoming={handleGetUpcoming}
        /> */}
        {/* <LiveMatch liveData={liveData} onGetLive={handleGetLive} /> */}
        <LeaugeData leagueData={leagueData} onGetLeague={handleGetLeagues} />
        <FifaData fifaData={fifaData} onGetFifa={handleGetFifaData} />
        {/* <CsgoGetMatch csgoMatch={csgoMatch} onGetMatch={handleGetCSGOMatch} /> */}
        {/* <Dota2GetMatch dota2Match={dota2Match} onGetMatch={handleGetDota2} /> */}
        {/* <LolGetMatch lolMatch={lolMatch} onGetMatch={handleGetLolData} /> */}
        {/* <ValorantGetMatch valorantMatch={valorantMatch} onGetMatch={handleGetValorant} /> */}

      </div>
    </div>
  );
}

// function ValorantGetMatch({ valorantMatch, onGetMatch }) {
//   return (
//     <div>
//       <button className="data-btn" onClick={onGetMatch}>
//         Valorant
//       </button>
//       <div className="">
//         {valorantMatch.map((data) => (
//           <Valorant data={data} key={data.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function Valorant({ data }) {
//   console.log(data);
//   return (
//     <div className="main-card">
//       <div className="fifa-matchs flex flex-row">
       
       
//         {/* <h1 className="title">{data.name}</h1> */}
       
        

//         {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
//         {/* <p>{data.streams_list[0]?.language}</p> */}
      
//         <div className="teams p-4 border-4 border-indigo-800 items-center flex flex-row gap-6  bg-zinc-600 w-[450px] m-4">
       
//         <div className="team-1 text-center">
//         <img
//           className="team1-image w-20 h-20 "
//           src={data.opponents[0]?.opponent.image_url}
//           alt={data.id}
//         />
//          <h3 className="teams-names">
//           {data.opponents[0]?.opponent.name}
//         </h3>
//         </div>

//         <div className="data text-center">
//         <h2 className="game-name">{data.videogame.name}</h2>
//         <h3 className="time">{data.begin_at}</h3>
//         <p className="game-data ">
//           {data.match_type} : {data.number_of_games} <br />
//           <label> game id: {data.games[0]?.id}</label>
//         </p>
//           <p className="links">
//           {/* {data.streams_list[0]?.embed_url} */}
//           <a className="links" href={data.streams_list[0]?.raw_url}>
          
//             <label>channle live</label>
//           </a>
//         </p>
//         </div>
        
//         <div className=" border-2 team-2 text-center self-end">
       
//         <img
//           className="team2-image w-20 h-20 "
//           src={data.opponents[1]?.opponent.image_url}
//           alt={data.id}
//         />
//          <h3 className="teams-names">
//           {data.opponents[1]?.opponent.name}
//         </h3>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }

//_________________________________________________________________________
// function LolGetMatch({ lolMatch, onGetMatch }) {
//   return (
//     <div>
//       <button className="data-btn" onClick={onGetMatch}>
//         League Of Legend
//       </button>
//       <div>
//         {lolMatch.map((data) => (
//           <Lol data={data} key={data.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function Lol({ data }) {
//   console.log(data);
//   return (
//     <div className="main-card">
//       <div className="fifa-matchs">
//         <h3 className="time">{data.begin_at}</h3>
//         <h3 className="teams-names">
//           {data.opponents[0]?.opponent.name}
//           <h3>VS</h3>
//           {data.opponents[1]?.opponent.name}
//         </h3>
//         {/* <h1 className="title">{data.name}</h1> */}
//         <h2 className="game-name">{data.videogame.name}</h2>
//         <p className="game-data">
//           {data.match_type} : {data.number_of_games} <br />
//           <label> game id: {data.games[0]?.id}</label>
//         </p>

//         {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
//         {/* <p>{data.streams_list[0]?.language}</p> */}
//         <p className="links">
//           {/* {data.streams_list[0]?.embed_url} */}
//           <a className="links" href={data.streams_list[0]?.raw_url}>
          
//             <label>channle live</label>
//           </a>
//           {/* <br />
//           <a className="links" href={data.streams_list[0]?.embed_url}>
          
//             <label>live Strem</label>
//           </a> */}
//         </p>
//         <img
//           className="team1-image"
//           src={data.opponents[0]?.opponent.image_url}
//           alt={data.id}
//         />

//         <img
//           className="team2-image"
//           src={data.opponents[1]?.opponent.image_url}
//           alt={data.id}
//         />
//       </div>
//     </div>
//   );
// }

// function Dota2GetMatch({ dota2Match, onGetMatch }) {
//   return (
//     <div>
//       <button className="data-btn" onClick={onGetMatch}>
//         DOTA 2
//       </button>
//       <div>
//         {dota2Match.map((data) => (
//           <Dota2 data={data} key={data.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function Dota2({ data }) {
//   console.log(data);
//   return (
//     <div className="main-card">
//       <div className="fifa-matchs">
//         <h3 className="time">{data.begin_at}</h3>
//         <h3 className="teams-names">
//           {data.opponents[0]?.opponent.name}
//           <h3>VS</h3>
//           {data.opponents[1]?.opponent.name}
//         </h3>
//         {/* <h1 className="title">{data.name}</h1> */}
//         <h2 className="game-name">{data.videogame.name}</h2>
//         <p className="game-data">
//           {data.match_type} : {data.number_of_games} <br />
//           <label> game id: {data.games[0]?.id}</label>
//         </p>

//         {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
//         {/* <p>{data.streams_list[0]?.language}</p> */}
//         <p className="links">
//           {/* {data.streams_list[0]?.embed_url} */}
//           <a className="links" href={data.streams_list[0]?.raw_url}>
          
//             <label>channle live</label>
//           </a>
//           {/* <br />
//           <a className="links" href={data.streams_list[0]?.embed_url}>
          
//             <label>live Strem</label>
//           </a> */}
//         </p>
//         <img
//           className="team1-image"
//           src={data.opponents[0]?.opponent.image_url}
//           alt={data.id}
//         />

//         <img
//           className="team2-image"
//           src={data.opponents[1]?.opponent.image_url}
//           alt={data.id}
//         />
//       </div>
//     </div>
//   );
// }

// function CsgoGetMatch({ csgoMatch, onGetMatch }) {
//   return (
//     <div>
//       <button className="data-btn" onClick={onGetMatch}>
//         CS-GO
//       </button>
//       <div>
//         {csgoMatch.map((data) => (
//           <CsGo data={data} key={data.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function CsGo({ data }) {
//   //  console.log(data)
//   return (
//     <div className="main-card">
//       <div className="fifa-matchs">
//         <h3 className="time">{data.begin_at}</h3>
//         <h3 className="teams-names">
//           {data.opponents[0]?.opponent.name}
//           <h3>VS</h3>
//           {data.opponents[1]?.opponent.name}
//         </h3>
//         {/* <h1 className="title">{data.name}</h1> */}
//         <h2 className="game-name">{data.videogame.name}</h2>
//         <p className="game-data">
//           {data.match_type} : {data.number_of_games} <br />
//           <label> game id: {data.games[0]?.id}</label>
//         </p>

//         {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
//         {/* <p>{data.streams_list[0]?.language}</p> */}
//         <p className="links">
//           {/* {data.streams_list[0]?.embed_url} */}
//           <a className="links" href={data.streams_list[0]?.raw_url}>
          
//             <label>channle live</label>
//           </a>
//           {/* <br />
//           <a className="links" href={data.streams_list[0]?.embed_url}>
          
//             <label>live Strem</label>
//           </a> */}
//         </p>
//         <img
//           className="team1-image"
//           src={data.opponents[0]?.opponent.image_url}
//           alt={data.id}
//         />

//         <img
//           className="team2-image"
//           src={data.opponents[1]?.opponent.image_url}
//           alt={data.id}
//         />
//       </div>
//     </div>
//   );
// }
//____________________________________________________________________________________________
function FifaData({ fifaData, onGetFifa }) {
  return (
    <div>
      <button className="data-btn" onClick={onGetFifa}>
        FiFa
      </button>
      <div>
        <Fifa data={fifaData} key={new Date().getTime} />
      </div>
    </div>
  );
}

function Fifa({ data }) {
  //  console.log(data)
  return (
    <div>
      {data.map((d, i) => (
        <div>
          <div>{d.games.id}</div>
          {/* <div>{d.id}</div>
        <img className="team1-image" src={d.image_url} alt="a" />
        <div>{d.videogame.slug}</div> */}
        </div>
      ))}
    </div>
  );
}

//--------------------------------------------------------------

function LeaugeData({ leagueData, onGetLeague }) {
  return (
    <div>
      <button className="data-btn" onClick={onGetLeague}>
        Leagues
      </button>
      <div>
        {leagueData.map((data) => (
          <League data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}

function League({ data }) {
  // console.log(data[0].name)
  return (
    <div>
      {/* {data.map((d, i) => ( */}
      <div>
        <div>{data.name}</div>
        <div>{data.id}</div>
        <img className="team1-image" src={data.image_url} alt="a" />
        <div>{data.videogame.slug}</div>
      </div>
      {/* ))} */}
    </div>
  );
}

function LiveMatch({ liveData, onGetLive }) {
  return (
    <div>
      <button className="data-btn" onClick={onGetLive}>
        Live
      </button>
      {liveData.map((data) => (
        <Live data={data} key={data.id} />
      ))}
    </div>
  );
}

function Live({ data }) {
  console.log(data);
  return (
    <div>
      {/* {liveData.map((d, i) => ( */}
      <div>
        <div>{data.endpoints[0].match.begin_at}</div>
        {/* <div>{data.id}</div>
          <img className="team1-image" src={data.image_url} alt="a" />
          <div>{data.videogame.slug}</div> */}
      </div>
      {/* ))} */}
    </div>
  );
}

function MatchList({ upcomingData, onGetUpcoming }) {
  return (
    <div>
      <button className="data-btn" onClick={onGetUpcoming}>
        up coming
      </button>

      {upcomingData.map((data) => (
        <Match data={data} key={data.id} />
      ))}
    </div>
  );
}

function Match({ data }) {
  console.log(data);
  return (
    <div className="main-card">
    <div className="fifa-matchs">
      <h3 className="time">{data.begin_at}</h3>
      <h3 className="teams-names">
        {data.opponents[0]?.opponent.name}
        <h3>VS</h3>
        {data.opponents[1]?.opponent.name}
      </h3>
      {/* <h1 className="title">{data.name}</h1> */}
      <h2 className="game-name">{data.videogame.name}</h2>
      <p className="game-data">
        {data.match_type} : {data.number_of_games} <br />
        <label> game id: {data.games[0]?.id}</label>
      </p>

      {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
      {/* <p>{data.streams_list[0]?.language}</p> */}
      <p className="links">
        {/* {data.streams_list[0]?.embed_url} */}
        <a className="links" href={data.streams_list[0]?.raw_url}>
        
          <label>channle live</label>
        </a>
        {/* <br />
        <a className="links" href={data.streams_list[0]?.embed_url}>
        
          <label>live Strem</label>
        </a> */}
      </p>
      <img
        className="team1-image"
        src={data.opponents[0]?.opponent.image_url}
        alt={data.id}
      />

      <img
        className="team2-image"
        src={data.opponents[1]?.opponent.image_url}
        alt={data.id}
      />
    </div>
  </div>
  );
}
