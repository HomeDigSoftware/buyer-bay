import React from 'react';
import AllBatsPanel from './AllBatsPanel';


export default function BatsCard({ nextBats, todaybats }) {
  // console.log("nextBats ", nextBats);
  // console.log("todayOpenBats ", todaybats);

  return (
    <div className='all-bats-panel'>

      <div className="row">

        {/* <div className="col-3">cancel</div> */}
      </div>

      <div>
        <h3>All Open Bats Running Today </h3>
        <div className='row'>
          <div className="col-3">Team</div>
          <div className="col-3">Amount</div>
          <div className="col-3">Start At</div>
        </div>
        {todaybats.map((match) => match.id !== null ? <AllBatsPanel match={match} key={match.id} /> : <div></div>)}
      </div>

      <div>
        <h3>All Upcoming Open Bats </h3>
        {nextBats.map((match) => match.id !== null ? <AllBatsPanel match={match} key={match.id} /> : <div></div>)}
      </div>
    </div>
  );
}
