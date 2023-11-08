import React, { useState , useEffect } from 'react';
import BattingPanel from './BattingPanel.js';
import { useAsyncValue } from 'react-router-dom';
import supabase from '../../services/supabase.js';
import "../../App.css"



export default function TeamCard({ data }) {
  const [showPanel , setShowPanel] = useState(false);
  const [matchOpenBats , setMatchOpenBats ] = useState("");
  const [haveOpenBats , setHaveOpenBats] = useState(false);
  const [user , setUser] = useState("");


  return (
    // <div className="main-card" onClick={() => console.log("you picked a match")}>
    <>
  { showPanel? <div> {haveOpenBats? <div><OpenBats  matchOpenBats={matchOpenBats} matchData={data} setHaveOpenBats={setHaveOpenBats} setShowPanel={setShowPanel}/> </div> : <BattingPanel setShowPanel={setShowPanel} data={data} showPanel={showPanel}/>} </div> : 
    //   <div className="main-card" onClick={() => setShowPanel(true)}>
      
      <div className="main-card" onClick={() => getBats(setShowPanel , data ,setMatchOpenBats, setHaveOpenBats )}> 
       <div className="fifa-matchs flex flex-row">
        <div className="teams-card flex flex-row gap-6  m-auto">
          <div className="team-1 text-center">
            <img
              className="team1-image w-20 h-20 m-auto"
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
              <a className="links" href={data.streams_list[0]?.raw_url}>
                <label>channle live</label>
              </a>
            </p>
          </div>
          <div className=" team-2 text-center ">
            <img
              className="team2-image w-20 h-20 m-auto"
              src={data.opponents[1]?.opponent.image_url}
              alt={data.id} />
            <h3 className="teams-names">
              {data.opponents[1]?.opponent.name}
            </h3>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
}




async function getBats( setShowPanel ,matchdata , setMatchOpenBats , setHaveOpenBats){
  
 
  let count = 0;

  let {data: open_bats , error} = await supabase         
  .from('bat_list')
  .select()
  .eq("match_ok" , false)

  console.log( "Match slug  = ",  matchdata , " match amount = " , open_bats.match_ok);
  if(open_bats.length >= 0){
    
    setMatchOpenBats(open_bats);
    open_bats.map((bat) => {
      if (bat.match_slug === matchdata.slug ) {
     
        count++;
        console.log( " db match OK =  " ,  bat.match_ok)
        console.log( " db open bat slug" , bat.match_slug )
        console.log( " match DB id" , bat.id)
        console.log( " db bat amount " , bat.tokens)
        console.log( " oppnent chosen team " , bat.chosen_team_id)     
        console.log( " current match slug " , matchdata.slug)
       setThePanel(setHaveOpenBats);
       
     }    
     else{
      setShowPanel(true)
     } 
   })
  }
  else {
    console.log(" show bating panel"); //bat.match_slug 
    setShowPanel(true)
  }
 
}
function setThePanel(setHaveOpenBats){
  setHaveOpenBats(false)
  setHaveOpenBats(true)
  console.log("set the panel")
}

function OpenBats({matchOpenBats ,matchData , setHaveOpenBats , setShowPanel}) {
 

  return (
    <div className='open-batting-background'>
      <div >
        {matchOpenBats.map((bat) => 
          <OpenBatsCard matchOpenBats={bat} matchData={matchData} setHaveOpenBats={setHaveOpenBats} setShowPanel={setShowPanel} key={bat.id} />
        
        )}
      </div>
      {/* style={{display:"inline" }} */}
      <div >
        <button onClick={() => setHaveOpenBats(false)} className='token-btn' style={{width: "80%"}}>place new bat</button>
        <button onClick={() => (setShowPanel(false) , setHaveOpenBats(false))} style={{margin:"10px" , display:"inline" , width:"10%" }} className='token-btn' > X </button>
      </div>
    </div>
  );
}


function OpenBatsCard({ matchOpenBats ,matchData , setHaveOpenBats ,setShowPanel}){
   const [localUser , setLocalUser] = useState("");
  
  console.log("local user =======>>>>>> " , localUser)
  let team_image = "";
  console.log("matchOpenBats.match_ok === false && matchOpenBats.match_id === matchData.id")
  console.log("matchOpenBats.match_ok ==> ", matchOpenBats.match_ok)
  console.log(matchOpenBats.match_id , " <= matchOpenBats.match_id === matchData.id => ", matchData.id)
    
  if( matchOpenBats.match_ok === "false" && matchOpenBats.match_id === matchData.id ){
  
     console.log("AAAAAAA")

     return(
    
      <div className=' team-1  row'>
          <div className='col-4'>
            <button onClick={()=>  updateBat_List( matchOpenBats ,  setHaveOpenBats ,setShowPanel) } className='token-btn'>bat on</button>
          </div>

          <div className=' team-1  col-4'> 
          {matchOpenBats.chosen_team_id === matchData.opponents[0].opponent.id? 
             <div>
             <img
                className="team1-image w-12 h-12 m-auto flex flex-row "
                src={matchData.opponents[1].opponent.image_url}
                alt={matchData.id} /> 
                <h3 className="teams-names ">
                {matchData.opponents[1]?.opponent.name} 
              </h3> 
              </div>
                :
                <div> <img
                className="team1-image w-12 h-12 m-auto"
                src={matchData.opponents[0].opponent.image_url}
                alt={matchData.id} /> 
                  <h4 className="teams-names text-center">
                {matchData.opponents[0]?.opponent.name} 
              </h4> 
              </div>
                }       
            </div>
            
            <div className='col-4'>
                <h3 style={{color: "black" ,paddingTop:"10px" , margin:"auto"}}>{matchOpenBats.tokens}</h3>      
            </div>
      </div>

    )
    }
   

  async function updateBat_List(   matchOpenBats,  setHaveOpenBats ,setShowPanel) {
   
       console.log('__________updateBat_List _______')
       console.log('matchOpenBats' ,matchOpenBats)
   
    let user = "";
   let userTokens = "";
   
    
    await supabase.auth.getUser().then((value) => {
     
      if(value.data?.user){
        user = value.data.user;
        console.log(" This is the supauser : " ,user)
      }
    })
  
    
    
    let {data, error } = await supabase
    .from("accounts")
    .select("tokens")
    .eq('user_id', user.id)
    
    userTokens = data[0];
    console.log(" get tokens => " , userTokens)
      postBat(userTokens , matchOpenBats , user ,setHaveOpenBats ,setShowPanel);
      
  }

  function postBat(userTokens , matchOpenBats ,user ,setHaveOpenBats ,setShowPanel){
   console.log('__________postBat _______')
   console.log('userTokens' ,userTokens)
   console.log('matchOpenBats' , matchOpenBats)
   console.log('user' ,user)
  

    theBat(userTokens , matchOpenBats , user ,setHaveOpenBats ,setShowPanel)
  }

  async function theBat(userTokens , matchOpenBats , user ,setHaveOpenBats , setShowPanel){ 
 
   console.log('__________the bat _______')
   console.log('userTokens' ,userTokens)
   console.log('matchOpenBats' , matchOpenBats)
 
   console.log('user' ,user.id)


    console.log(' user data' ,userTokens.tokens , matchOpenBats.tokens)
   if(user.id !== matchOpenBats.user_id ){
    if (userTokens.tokens >= matchOpenBats.tokens) {
   
      const { error } = await supabase
      .from('bat_list')
      .update({ match_ok: "true" })
      .eq("id", matchOpenBats.id) // bat_id
      .select()
      
      const { error02 } = await supabase
      .from("bat_list")
        .update({ opp_user_id: user.id })
        .eq("id", matchOpenBats.id) //bat_id
        .select()

      const { error03 } = await supabase
        .from("bat_list")
        .update({ opp_email: user.user_metadata.email })
        .eq("id", matchOpenBats.id) //bat_id
        .select()
        
        setHaveOpenBats(false)
        setShowPanel(false)
      console.log("from Quick Matching", matchOpenBats.id,)
    
    }
    else {
      console.log("you dont have enoufe money ", userTokens)
      return
    }

  }else{
    console.log("you open the bat :) cant bat on it ")
  }
   }
   

}



// <div  className='open-batting-background  '  >
      
// <div  className=" flex flex-row gap-10 open-batting m-auto" >
   
//      <div className=' team-1 flex flex-row gap-20 text-center m-auto'>
//       <button onClick={() => updateBat_List(user ,matchOpenBats ,  setHaveOpenBats ,setShowPanel)  } className='token-btn'>bat on</button>
//       {matchOpenBats.chosen_team_id === matchData.opponents[0].opponent.id? 
//      <div>
//      <img
//         className="team1-image w-12 h-12 m-auto flex flex-row "
//         src={matchData.opponents[1].opponent.image_url}
//         alt={matchData.id} /> 
//         <h3 className="teams-names flex flex-row">
//         {matchData.opponents[1]?.opponent.name} 
//       </h3> 
//       </div>
//         :
//         <div> <img
//         className="team1-image w-12 h-12 m-auto flex flex-row"
//         src={matchData.opponents[0].opponent.image_url}
//         alt={matchData.id} /> 
//           <h4 className="teams-names flex flex-row">
//         {matchData.opponents[0]?.opponent.name} 
//       </h4> 
//       </div>
//         }       
//       <h3 style={{color: "black" ,paddingTop:"10px" , margin:"auto"}}>{matchOpenBats.tokens}</h3>
//     </div>
   
//     </div>
// </div>