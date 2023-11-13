import React, { useEffect, useState } from 'react';
import Logo from './logo-package-GOLD/png/logo-no-background.png';
import "./App.css"
import AddTokens from "./component/gamesData/AddTokens.js"
import ShowUserTokens from './component/gamesData/ShowUserTokens.js';
import BatUpdate from './component/gamesData/BatUpdate.js';
import UserAccount from './component/gamesData/UserAccount.js';
import supabase from './services/supabase.js';
import { OpenBatsCard } from "./component/gamesData/TeamCard.js"

export function SiteHeader() {
  const [userTokens, setUserTokens] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(" This is the supauser : ", value.data.user)
          setUser(value.data.user.aud)
          // return
          getTokensDB(value.data.user, setUserTokens);
        }
      })
    }
    getUserData();

  }, [])


  async function getTokensDB(user, setUserTokens) {
    const { data, error } = await supabase
      .from('accounts')
      .select('tokens')
      .eq('user_id', user.id)    // Correct
    console.log("the _____from SITE HEADER __________data :: ", data[0]?.tokens)
    setUserTokens(data[0]?.tokens)
  }

  return (

    <header className="border-bottom lh-1 py-3">
      <div className="main-header row flex-nowrap justify-content-between align-items-center text-center">
        <div className="col-3 pt-1 flex flex-row">

          <AddTokens userTokens={userTokens} setUserTokens={setUserTokens} />
          <BatUpdate />
          <GetAllOpenBats />
          <div className='tokens-header m-auto' style={{ fontSize: "18px", fontWeight: "800", }}> You Have {"\n"} {userTokens}TK</div>
        </div>
        <div className="logo-cont col-6 text-center">

          <img className='logo' src={Logo} alt='logo' />

        </div>

        <div className="col-3 d-flex justify-content-end pr-5">
          <button className='token-btn btn btn-secondary'> <UserAccount /> </button>
          <a className="link-secondary-icon" href="#" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
          </a>

          <a className="btn btn-sm " href="#">Sign up</a>
        </div>

      </div>
    </header>
  );
}

function GetAllOpenBats() {
  const [todayOpenBats, setTodayOpenBats] = useState({});
  const [nextDayOpenBats, setNextDayOpenBats] = useState({});
  const [showPanel, setShowPanel] = useState(false);
  const date = new Date();
  const curr_year = date.getFullYear(date);
  const curr_month = date.getMonth(date) + 1;
  const curr_day_in_month = date.getDate(date);
  const curr_hour = date.getHours(date);
  const curr_minute = date.getMinutes(date)

  async function getUpcoming() {

    const { data, error } = await supabase
      .from("bat_list")
      .select()
      .match({
        match_ok: "false",
        // day: "10",
        // month: "11",

      })
      .gt("year", curr_year - 1)
      .gt("month", curr_month - 1)
      .gt("day", (curr_day_in_month))

    // .gt( "hour" , curr_hour -1)
    // .gt( "minutes" , curr_minute)

    console.log("upcoming match  : ", data, data[0]?.id);
    setNextDayOpenBats(data)


    // getUpcoming(curr_day_in_month , curr_hour , curr_minute , curr_year , curr_month)
    // console.log(data.map((match)=> console.log(match) ) , curr_day_in_month ,"::", curr_hour)  
    getmatches();
  }

  async function getmatches() {
    const { data, error } = await supabase
      .from("bat_list")
      .select()
      .match({
        match_ok: "false",
        day: curr_day_in_month,
        year: curr_year,
        month: curr_month,
      })
      .gt("hour", curr_hour)
    // .gt("hour" , curr_hour -1)
    console.log(" D / Y / M / H", curr_day_in_month, curr_year, curr_month, curr_hour)
    setTodayOpenBats(data)
    setShowPanel(!showPanel)
    // data.map((match_time)=>  console.log("today matchssss : " , match_time.hour , " time: day" , match_time.day));
  }
  return (
    <div>
      <button className="token-btn btn btn-secondary m-auto"
        onClick={() => getUpcoming()} >
        today bats
      </button>
      {showPanel ? <BatsCard nextBats={nextDayOpenBats} todaybats={todayOpenBats} /> : <div></div>}
      {/* {showPanel ?  <BatsCard  /> :  <div></div>} */}
      {/* {showPanel ? <div><AllBatsPanel todayOpenBats={todayOpenBats} key={todayOpenBats.id} nextDayOpenBats={nextDayOpenBats} /> </div> : <div> </div>} */}
    </div>

  )
}

function BatsCard({ nextBats, todaybats }) {
  console.log("nextBats ", nextBats)
  console.log("todayOpenBats ", todaybats)

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
  )
}


function AllBatsPanel({ match }) {
  console.log("today match id ", match?.id)
  console.log("upcoming match id ", match?.id)
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
                <button onClick={()=> <OpenBatsCard />}>Bat On</button>
              </div>
        </div>
        {/* <div className='row'> matchOpenBats ,matchData , setHaveOpenBats ,setShowPanel
        <div className=" col-3">
          <img className='w-20 h-20 m-auto' src={match?.chosen_team_image} alt='team-image' />
        </div>
        <div className=" col-3">
          <img className='w-20 h-20 m-auto' src={match?.opp_team_image} alt='team-image' />
        </div>
        </div>
        <div className=" col-3" style={{ color: "blue" }}>
        </div> */}
        {/* <div> 
          {nextBats?.chosen_team_name} 
          {nextBats?.opp_team_name}
          <img className='w-20 h-20 m-auto' src={nextBats?.chosen_team_image} alt='team-image' />
          <img className='w-20 h-20 m-auto' src={nextBats?.opp_team_image} alt='team-image'/>

           :: {nextDayOpenBats.map((upcomingbat)=>  upcomingbat.chosen_team_name + "  :::  :: :  ")} ::
        </div>*/}
        {/* <div style={{ color: "green" }}>
 

        </div> */}
      </div>
    </div>

  )
}
const getTokens = async (setUserTokens, setMessage, user) => {
  // const { data: { user } } = await supabase.auth.getUser()


  console.log("get-user-data", user)
  if (user === "authenticated") {
    let { data: tokens, error02 } = await supabase
      .from('accounts')
      .select('tokens')
      .eq('user_id', user.id)
    tokens.map((data) => {
      console.log('you have from the site Header:', data, " tokens")

    })
  }
  else {
    console.log("you need to loged in to buy Tokens")
    // setMessage(true)
  }


}
