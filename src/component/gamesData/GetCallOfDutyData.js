import React from 'react';
import supabase from "../../services/supabase.js";
import TeamCard from './TeamCard.js';

// export default function GetGames({setCallOfDutyMatch}){
//     return(
//         <div>
//             <button className="data-btn" onClick={() => fetchGameList(setCallOfDutyMatch)}> newdata </button>
//         </div>
//     )
// }

export function Call_Of_Duty_Button({ setCallOfDutyMatch }) {
    return (
      <div className='valorant-card'>
        <button className="data-btn" onClick={() => fetchGameList(setCallOfDutyMatch)}>
          Call Of Duty
        </button>
      </div>
    );
  }
  
// ***new get the game list from the app supabase DB 
// ***saving on api call and traffic to pandascore 
async function fetchGameList(setCallOfDutyMatch){

    let { data, error } = await supabase
    .from('call_of_duty_game_list')
    .select('game_list')

     const db_data = data[0].game_list;
 

     // ***seting the data from the API call to 
   // ***pandaScore to the useState (setCsgoMatch)
   // ***that is on the (GameButton.js) script
     setCallOfDutyMatch(db_data)

     db_data.map((game => (
      console.log('league DATA ' ,
      ' \n id : ' , game.league.id ,
      ' \n name : ' , game.league.name,  
      '\n slug : ' , game.league.slug , 
      '\n image_url : ' , game.league.image_url  )
     )));
  
}

export function CallOfDutyGetMatch({ callOfDutyMatch }) {
    return (
      <div>
        <div>
          {callOfDutyMatch.map((data) => (
            <TeamCard data={data} key={data.id} />
          ))}
        </div>
      </div>
    );
  }
  