import React from 'react';
import OpenBatsCard from './OpenBatsCard.js';

export default function AllBatsPanel({ match }) {
  // console.log("today match id ", match?.id);
  // console.log("upcoming match id ", match?.id);
  return (


    <div>
      <div>
        <div className="row" style={{ color: "blue" }}>
          {/* {todayOpenBats.map((bat)=>  bat.chosen_team_name + " <  ===  >")} */}
          <div className='col-2'>
            {match?.chosen_team_name}
          </div>

          <div className=' col-2'>
            {match?.opp_team_name}
          </div>

          <div className=' col-2'>
            {match.hour}  :0
            {match.minutes}
          </div>

          <div className='col-2'>
            {match.opp_team_name}
            <div>
              {match?.tokens}
            </div>
          </div>
          <div className='col-4 flex flex-row'>
            <img className='w-20 h-20 m-auto' src={match?.chosen_team_image} alt='team-image' />
            <div> VS </div>
            <img className='w-20 h-20 m-auto' src={match?.opp_team_image} alt='team-image' />
          </div>
          <div>
            <button onClick={() => <OpenBatsCard />}>Bat On</button>
          </div>
        </div>
      </div>
    </div>

  );
}
