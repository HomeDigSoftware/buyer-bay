import { useState } from "react"
import supabase from "../../services/supabase";
import React from 'react';
import '../../App.css';
import axios from 'axios';

export default function UserAccount() {
    const [user_data, setUser_data] = useState(null);
    const [showAccount, setShowAccount] = useState(false);
    const [myBat, setMyBat] = useState({});
    const [joinBat, setJoinBat] = useState({});
    const [combine, setCombine] = useState({});


    async function getUserBats(setUser_data, setJoinBat, setMyBat) {
        const { data: { user } } = await supabase.auth.getUser()



        let { data: bat_list02, error02 } = await supabase
            .from('bat_list')
            .select("*")

            // Filters
            .eq('user_id', user.id)
        setMyBat(bat_list02)
        console.log(bat_list02.map((bat) => (bat.id, bat.match_ok)))
        //_________________________________________________________________________________________________

        let { data: bat_list01, error01 } = await supabase
            .from('bat_list')
            .select("*")

            // Filters
            .eq('opp_user_id', user.id)
        setJoinBat(bat_list01)
        console.log(bat_list01.map((bat) => (bat.id, bat.match_ok)))

        //_________________________________________________________________________________________________

        // let { data: bat_list_combine , error_combine } = await supabase 
        //   .from('bat_list')
        //   .select("*")
        //   .eq(["opp_user_id" , user.id]&&["user_id" , user.id])
        // //   .eq("user_id" , user.id)

        //   console.log(" COMBINE => ",bat_list_combine)
        //console.log(" => ",bat_list_combine.map((bat) => (bat.id, bat.match_ok)))
        // setCombine(bat_list_combine);

        //_________________________________________________________________________________________________
        console.log(" my-bat =>  ")
        setUser_data(user)
        setShowAccount(true)

    }



    return (
        <div>
            <button onClick={() => getUserBats(setUser_data, setJoinBat, setMyBat)}> Account </button>
            {showAccount ? <div className="" style={{ display: 'inline-block', color: "black" }}>
                <AccountPanel getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} myBat={myBat} joinBat={joinBat} setShowAccount={setShowAccount} user_data={user_data} /> </div>
                // <AccountPanel ongetUserBats={getUserBats} setJoinBat={setJoinBat} setMyBat={setMyBat} myBat={myBat} joinBat={joinBat} setShowAccount={setShowAccount} setWinnerTeam={setWinnerTeam} /> </div>
                : <div> </div>}
        </div>
    )
}





function AccountPanel({getUserBats ,setUser_data, setJoinBat ,setMyBat, myBat, joinBat, setShowAccount, user_data }) {

    // console.log("combine :" , combine)
    console.log("myBat :", myBat)
    console.log("joinBat :", joinBat)
    // getUserBats()
    return (
        <div className="account-panel">

            <div>
                <button className="btn" style={{ backgroundColor: "gray", position: "fixed" }} onClick={() => setShowAccount(false)}>close</button>
            </div>
            <div className="row">
                <div className="col-3">Team</div>
                <div className="col-3">Amount</div>
                <div className="col-3">Start At</div>
                <div className="col-3">cancel</div>
            </div>
            <div>  <h3>open bats</h3>
                <div style={{ color: "blue" }}>
                    {/* {myBat.map((bat) => bat.match_ok === "false" ? <SingelBat_On userTeam={bat.chosen_team_id} userTeamName={bat.chosen_team_name} bat={bat} key={bat.id} /> : */}
                    {myBat.map((bat) => bat.match_ok === "false" ? <SingelBat_Open getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} user_data={user_data} userTeam={bat.chosen_team_id} userTeamName={bat.chosen_team_name} bat={bat} setShowAccount={setShowAccount} key={bat.id} /> :
                        <div > </div>)}

                </div>
                <div style={{ color: "blue" }}>
                    {joinBat.map((bat) => bat.match_ok === "false" ? <SingelBat_Open getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} myBat={myBat} joinBat={joinBat} user_data={user_data} userTeam={bat.opp_team_id} userTeamName={bat.opp_team_name} bat={bat} setShowAccount={setShowAccount} key={bat.id} /> :
                        // {joinBat.map((bat) => bat.match_ok === "false" ? <SingelBat_On userTeam={bat.opp_team_id} userTeamName={bat.opp_team_name} bat={bat} key={bat.id} /> :

                        <div></div>)}
                </div>

                <div>  <h3>accepted bats</h3>
                    <div style={{ color: "green" }}>
                        {myBat.map((bat) => bat.match_ok === "true" ? <SingelBat_Open getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} myBat={myBat} joinBat={joinBat} user_data={user_data} userTeam={bat.chosen_team_id} userTeamName={bat.chosen_team_name} bat={bat} setShowAccount={setShowAccount} key={bat.id} /> :
                            <div > </div>)}

                    </div>
                    <div style={{ color: "green" }}>
                        {joinBat.map((bat) => bat.match_ok === "true" ? <SingelBat_Open getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} myBat={myBat} joinBat={joinBat} user_data={user_data} userTeam={bat.opp_team_id} userTeamName={bat.opp_team_name} bat={bat} setShowAccount={setShowAccount} key={bat.id} /> :

                            <div > </div>)}
                    </div>



                    {/* <div style={{color: "red"}}>
                   {myBat.map((bat) => bat.match_ok === "false" ?   <SingelBat_Open bat={bat} key={bat.id} />: 
                   <div >
                   <h3>accepted Bats</h3>
                     <div style={{color:"green"}} >
                        <SingelBat_On bat={bat} key={bat.id} />
                        <BatLayout bat={bat} key={bat.id} />
                     </div>
                     <div>
                     {joinBat.map((bat)=> <SingelBat_On bat={bat}key={bat.id} />)}
                     </div>
                 </div>)
                   }  */}
                    {/* </div>    
            <div style={{color:"blue"}}>       
              {joinBat.map((bat)=> bat.match_ok === "false" ?  <SingelBat_Open bat={bat} key={bat.id} /> : 
              
              <div style={{color:"green"}}>
                <h3>accepted Bats</h3>
                  <div className="" >
                  {myBat.map((bat) => <SingelBat_On bat={bat} key={bat.id} />)} 
                  </div>
                  <div>
                  <SingelBat_On bat={bat} key={bat.id} />
                  </div>
              </div> )
                 }
            </div> */}

                </div>
            </div>
        </div>
    )
}

function BatLayout({ bat }) {
    return (
        <div>
            <SingelBat_On bat={bat} />
        </div>
    )
}

function SingelBat_Open({getUserBats ,setUser_data , setJoinBat,setMyBat , myBat, joinBat, user_data, userTeam, userTeamName, bat , setShowAccount }) {
    const [winnerTeam, setWinnerTeam] = useState(null);
    const [winnerTeamData, setWinnerTeamData] = useState({});
    const [lastBatId, setLastBatId] = useState();
    const [counter, setCounter] = useState(0);
    // const [bat_steel_good , setBat_steel_good] = useState(false);

    let match_result = {};
    let bat_steel_good = 'false';

    const date = new Date();
    let t_time = bat.match_time.slice(11, 16);
    let t_data = bat.match_time.slice(0, 10);

    const the_data = new Date(bat.match_time);
    const match_year = the_data.getFullYear(the_data);
    const match_month = the_data.getMonth(the_data) + 1;
    const match_day_in_month = the_data.getDate(the_data);
    const match_hour = the_data.getHours(the_data) - 3;
    const match_minute = the_data.getMinutes(the_data);

    const curr_year = date.getFullYear(date);
    const curr_month = date.getMonth(date) + 1;
    const curr_day_in_month = date.getDate(date);
    const curr_hour = date.getHours(date);
    const curr_minute = date.getMinutes(date)
    // const match_year = day * 365;


    // let currentTime = set;
    let getyear = Math.round(date.getTime());
    let currentyear = date.toString().slice(11, 16);


    console.log(bat_steel_good, " <= GOOD : if bat is accpted ", bat.match_slug);
    console.log("the match_OK : ", bat.match_ok, match_month, curr_month);
    console.log("NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW CALLLLL lastBatId != bat.id :", (lastBatId != bat.id));



    if (bat.match_ok === "true" && lastBatId != bat.id) {
        bat_steel_good = "true";
        console.log(bat.id, "<= bat_id  (can check at => )", (match_hour) + 6, " match hour => ", match_hour, " : ", "curr hour =>", curr_hour)
        console.log(match_day_in_month, " <= match_day_in_month : curr_day_in_month => ", curr_day_in_month)
        console.log("winning team id", bat.winning_team_id);
        console.log("match_day_in_month < curr_day_in_month ", (match_day_in_month < curr_day_in_month));
        console.log("bat.winning_team_id === null ", bat.winning_team_id === null)
        console.log(" lastBatId !== bat.id ", (lastBatId !== bat.id));


        if (match_day_in_month < curr_day_in_month && bat.winning_team_id === null && lastBatId !== bat.id ||
            match_day_in_month >= curr_day_in_month && bat.winning_team_id === null && lastBatId !== bat.id && curr_month > match_month) {
            console.log(lastBatId, "check_Winner <= last_bat-id : bat_id => ", bat.id)
            check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter)
            // check_the_winner(user_data, userTeam,  winnerTeamData, setWinnerTeamData , setWinnerTeam, bat , lastBatId , setCounter , counter)
            setLastBatId(bat.id)

        }
        else if (match_day_in_month === curr_day_in_month && match_hour + 6 <= curr_hour && bat.winning_team_id === null && lastBatId !== bat.id) {
            console.log(lastBatId, "check_Winner <= last_bat-id : bat_id => ", bat.id)
            check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter)
            // check_the_winner(user_data, userTeam, winnerTeamData, setWinnerTeamData ,setWinnerTeam, bat , lastBatId , setCounter , counter)
            setLastBatId(bat.id)

        }
        else if (bat.winning_team_id !== null && winnerTeam === null) {
            bat_steel_good = "true";
            setWinnerTeam(bat.winning_team_id)
            console.log("not invoke check_Winner winning team id from data base", winnerTeam, "<==>", bat.winning_team_id)
        }
        // if ((match_hour ) + 6 < curr_hour && bat.winning_team_id === null && match_day_in_month <= curr_day_in_month) {
        //     console.log(" match started at : ", match_hour, "can check the result 6 houres has passet after ")




        //     if (lastBatId === bat.id) {
        //         // console.log(lastBatId, " <= last_bat-id : bat_id => ", bat.id)

        //     }
        //     else {
        //         console.log(lastBatId, " <= last_bat-id : bat_id => ", bat.id)
        //         check_the_winner(setWinnerTeam, bat , lastBatId , setCounter , counter)
        //         setLastBatId(bat.id)

        //         // bat_steel_good = "true"


        //     }

        // }


        // if (match_result.winner?.id === userTeam) {
        //     console.log("you pick the winner  winning is ", userTeam, " : ", userTeamName)
        // }
        // else {
        //     console.log("you lose the bat  ", match_result.winner?.id, " : ", userTeam)

        // }



    }
    else {

        if (match_year <= curr_year &&
            match_month <= curr_month &&
            match_day_in_month < curr_day_in_month &&
            bat.match_ok !== "true"

        )  //       && match_minute <= date.getMinutes(date) &&   match_hour <= date.getHours(date)  
        {
            console.log("the bat : bat_id :", bat.id, "OUTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", t_time, " month :", match_month, " match hour", match_hour, " >= ", curr_hour,
                " day-in-month : ", match_day_in_month)
            bat_steel_good = "false"
        }
        else {
            if (match_day_in_month >= curr_day_in_month && bat.match_ok === "false") {  //match_hour

                if (match_day_in_month === curr_day_in_month && match_hour >= curr_hour && match_minute >= curr_minute < 10) {
                    console.log("INNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN ", bat.id)
                    console.log(" match_month :", match_month)
                    console.log(" curr_month :", curr_month)
                    console.log(" match hour", match_hour)
                    console.log("curr_hour", curr_hour)
                    console.log("match_day_in_month", match_day_in_month)
                    console.log("curr_day_in_month", curr_day_in_month)

                    bat_steel_good = "true"
                }

                else if (match_day_in_month > curr_day_in_month && match_month >= curr_month) {
                    console.log("INNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN ", bat.id)
                    console.log(" match_month :", match_month)
                    console.log(" curr_month :", curr_month)
                    console.log(" match hour", match_hour)
                    console.log("curr_hour", curr_hour)
                    console.log("match_day_in_month", match_day_in_month)
                    console.log("curr_day_in_month", curr_day_in_month)

                    bat_steel_good = "true"
                }
                else {
                    console.log("OUTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", bat.id,)
                    console.log(" match_month :", match_month)
                    console.log(" curr_month :", curr_month)
                    console.log(" match hour", match_hour)
                    console.log("curr_hour ", curr_hour)
                    console.log("match_day_in_month : ", match_day_in_month)
                    console.log("curr_day_in_month : ", curr_day_in_month)
                    bat_steel_good = "false"
                    return
                }


            } else {
                if (bat.match_ok === "false") {
                    console.log("OUTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", bat.id,)
                    console.log(" match_month :", match_month)
                    console.log(" curr_month :", curr_month)
                    console.log(" match hour", match_hour)
                    console.log("curr_hour ", curr_hour)
                    console.log("match_day_in_month : ", match_day_in_month)
                    console.log("curr_day_in_month : ", curr_day_in_month)


                    bat_steel_good = "false"
                }



            }

            bat_steel_good = "true";
            console.log(bat_steel_good, "bat_id ", bat.id, "match is good to go _____________________________________")

        }
    }

    async function deleteBat(getUserBats ,setUser_data , setJoinBat, setMyBat, myBat, joinBat, user_data , setShowAccount) {
        let combine = ""
        const { error } = await supabase
        .from('bat_list')
        .delete()
        .eq ('id' , bat.id)
        console.log("cancel bat :" , bat.id , user_data.id)
        
            
            // setShowAccount(false);            
            getUserBats(setUser_data, setJoinBat, setMyBat)
            // setShowAccount(true);
    }

    return (
        <div className="">
            {bat_steel_good === "true" ? <>
                <div>

                </div>
                <div className="row">
                    <div className="account-col col-3">
                        {userTeamName}
                    </div>
                    <div className="account-col col-3">
                        {bat.tokens}
                    </div>
                    <div className="account-col col-3">
                        <div className="row">
                            <div className="col-6">
                                {t_data}

                            </div>
                            <div className="col-3">
                                {t_time}
                            </div>
                            <div className="col-3">
                                : {bat.id}
                            </div>
                        </div>
                    </div>
                    <div className="account-col col-3">
                        {bat.match_ok === "true" ? <div> </div> : <button className="btn" style={{ backgroundColor: "gray" }} onClick={()=> deleteBat(getUserBats ,setUser_data, setMyBat, setJoinBat, myBat, joinBat, user_data , setShowAccount) }>00cancel</button>}  {/* {bat.id}*/}
                        {winnerTeam !== null ? winnerTeam === userTeam ? <div> you WIN</div> : <div> You lose</div> : <div>  </div>}
                    </div>
                </div> </> : <div></div>}

        </div>
    )
}

function SingelBat_On({ userTeam, userTeamName, bat }) {
    return (
        <div className="">
            <div>

            </div>
            <div className="row">
                <div className="account-col col-3">
                    {bat.chosen_team_name}
                </div>
                <div className="account-col col-3">
                    {bat.tokens}
                </div>
                <div className="account-col col-3">
                    {bat.match_time}
                </div>
                <div className="account-col col-3">
                    {bat.match_ok ? <div> </div> : <button className="btn" style={{ backgroundColor: "gray" }}>cancel</button>} {/* {bat.id}*/}
                </div>
            </div>

        </div>
    )
}


async function check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter) {

    console.log("AAAAAAAAAAAAAa start lastBatId === bat.id", bat)
    // setValorantMatch(text.upcoming)
    if (lastBatId === bat.id) {
        return
    }
    else {
        console.log("start")
        const server_response = await fetch('/.netlify/functions/checkWinnerApi', {
            method: "POST",
            body: JSON.stringify({
                match_slug: bat.match_slug
            })
        })
        //  .then(server_response => server_response.text);
        const theData = await server_response.text();
        const text = JSON.parse(theData)
        console.log(" new API call test", text.upcoming.slug);
        console.log(" the Winner : ", text.upcoming.winner?.name);
        if (text.upcoming.winner !== null) {
            setWinnerTeam(text.upcoming.winner.id)
            setWinnerTeamData(text.upcoming.winner)
            winnerUpdate(bat, user_data, userTeam, text.upcoming.winner, bat.tokens)
        }
    }


}


// function check_the_winner(user_data, userTeam, winnerTeamData, setWinnerTeamData , setWinnerTeam, bat , lastBatId , setCounter , counter) {

//     let match_result = {};
//     // setCounter(counter++);
//     console.log("pandascore Api : lastbatid : => " , lastBatId , " the bat id :=>" , bat.id)
//     console.log("pandascore Api userteam : => " , userTeam , " tokens"  ,  bat.tokens)
//     // if(lastBatId === bat.id){
//     //         return
//     // }
//     // else
//     // {

// //__________________________________________________________________________________________________________________________________________________________
// const options = {
//     method: 'GET',
//     url: `https://api.pandascore.co/matches/${bat.match_slug}`,
//         // url: "https://api.pandascore.co/matches/ucam-esports-club-2023-10-25",  //https://api.pandascore.co/matches/ucam-esports-club-2023-10-25
//         headers: {
//             accept: 'application/json',
//             authorization: 'Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
//         }
//     };

//     axios
//         .request(options)
//         .then(function (response) {
//             console.log("response : =>" , "bat_id :" , bat.id, response.data?.winner) ;
//             console.log("response : =>" , "bat_id + data:" , bat.id, response.data) ;
//             if(response.data.winner !== null){    //________________________________
//                  setWinnerTeam(response.data.winner.id)  //________________________________
//                  setWinnerTeamData(response.data)    //________________________________
//             match_result = response?.data;
//             console.log(" the match slug", bat?.match_slug);
//             console.log(" the match get match_result", match_result.winner?.id);
//             console.log(" the match get response", response.data.winner?.id);
//             console.log(response.data ,"bat_id " , bat.id," _____________________________________________________________");
//             console.log( " the match get", response.data.winner?.slug);
//             winnerUpdate(user_data, userTeam , response.data ,bat.tokens )  //_________________
//         }

//     })
//     .catch(function (error) {
//         console.error(error);
//     });

//     // }

// }
// //__________________________________________________________________________________________________________________________________________________________



async function winnerUpdate(bat, user_data, userTeam, winnerTeamData, wins_tokens) {
    console.log("user_data", user_data)
    console.log("userTeam", userTeam)
    console.log("winnerTeamData", winnerTeamData)
    console.log("wins_tokens", wins_tokens)
    let getTokens = null;

    console.log("from the update ", winnerTeamData, winnerTeamData?.id)
    const { w_data, update_error } = await supabase
        .from('bat_list')
        .update({ winning_team_id: winnerTeamData?.id })
        .eq("match_id", bat.match_id)
        .select()

    // update the tokens 
    const { data: u_tokens, t_error } = await supabase
        .from('accounts')
        .select('tokens')
        .eq('user_id', user_data.id)
    u_tokens.map((data) => {

        console.log('you have :', data.tokens, " tokens", user_data.id)
        getTokens = data.tokens
    })
    console.log("user tokens :", u_tokens)

    if (userTeam === winnerTeamData?.id) {
        const { up_data: updata_tokens, up_error } = await supabase
            .from('accounts')
            .update({ tokens: getTokens + (wins_tokens) })
            .eq("user_id", user_data.id)
            .select()

        console.log("wins tokens :", wins_tokens)
        console.log("user tokens :", u_tokens)
        console.log("total tokens :", getTokens + wins_tokens)
    }
    else {
        const { up_data: updata_tokens, up_error } = await supabase
            .from('accounts')
            .update({ tokens: getTokens - (wins_tokens) })
            .eq("user_id", user_data.id)
            .select()

        console.log("wins tokens :", wins_tokens)
        console.log("user tokens :", u_tokens)
        console.log("total tokens :", getTokens - wins_tokens)
    }


}