import React from 'react';





export function Dota2Button({ onGetDota2Data }) {
  return (
    <div className='valorant-card'>
      <button className="data-btn" onClick={onGetDota2Data}>
        DOTA 2
      </button>
    </div>
  );
}


export function Dota2GetMatch({ dota2Match, onGetMatch }) {
  return (
    <div>
      {/* <button className="data-btn" onClick={onGetMatch}>
                DOTA 2
              </button> */}
      <div>
        {dota2Match.map((data) => (
          <Dota2 data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}
function Dota2({ data }) {
  console.log(data);
  return (

    <div className="main-card">
      <div className="fifa-matchs flex flex-row">


        {/* <h1 className="title">{data.name}</h1> */}



        {/* <img className="fifa-image" src={data.league.image_url} alt={data.name} /> */}
        {/* <p>{data.streams_list[0]?.language}</p> */}

        <div className="teams-card items-center flex flex-row gap-6  m-auto">

          <div className="team-1 text-center">
            <img
              className="team1-image w-20 h-20 "
              src={data.opponents[0]?.opponent.image_url}
              alt={data.id} />
            <h3 className="teams-names">
              {data.opponents[0]?.opponent.name}
            </h3>
          </div>

          <div className="data text-center">
            <h2 className="game-name">{data.videogame.name}</h2>
            <h3 className="time">{data.begin_at}</h3>
            <p className="game-data ">
              {data.match_type} : {data.number_of_games} <br />
              <label> game id: {data.games[0]?.id}</label>
            </p>
            <p className="links">
              {/* {data.streams_list[0]?.embed_url} */}
              <a className="links" href={data.streams_list[0]?.raw_url}>

                <label>channle live</label>
              </a>
            </p>
          </div>

          <div className=" team-2 text-center ">

            <img
              className="team2-image w-20 h-20 "
              src={data.opponents[1]?.opponent.image_url}
              alt={data.id} />
            <h3 className="teams-names">
              {data.opponents[1]?.opponent.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
