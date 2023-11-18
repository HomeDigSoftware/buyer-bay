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
        console.log(" my-bat =>  ")
        setUser_data(user)
        setShowAccount(true)

    }



    return (
        <div className="">
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
                    {myBat.map((bat) => bat.match_ok === "false" ? <SingelBat_Open getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} user_data={user_data} userTeam={bat.chosen_team_id} userTeamName={bat.chosen_team_name} bat={bat} setShowAccount={setShowAccount} key={bat.id} /> :
                        <div > </div>)}

                </div>
                <div style={{ color: "blue" }}>
                    {joinBat.map((bat) => bat.match_ok === "false" ? <SingelBat_Open getUserBats={getUserBats} setUser_data={setUser_data} setJoinBat={setJoinBat} setMyBat={setMyBat} myBat={myBat} joinBat={joinBat} user_data={user_data} userTeam={bat.opp_team_id} userTeamName={bat.opp_team_name} bat={bat} setShowAccount={setShowAccount} key={bat.id} /> :

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

                </div>
            </div>
        </div>
    )
}


function SingelBat_Open({getUserBats ,setUser_data , setJoinBat,setMyBat , myBat, joinBat, user_data, userTeam, userTeamName, bat , setShowAccount }) {
    const [winnerTeam, setWinnerTeam] = useState(null);
    const [winnerTeamData, setWinnerTeamData] = useState({});
    const [lastBatId, setLastBatId] = useState();
    const [counter, setCounter] = useState(0);
 

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


    if (bat.match_ok === "true" && lastBatId != bat.id) {
       
        bat_steel_good = "true";

        if (match_day_in_month < curr_day_in_month && bat.winning_team_id === null && lastBatId !== bat.id ||
            match_day_in_month >= curr_day_in_month && bat.winning_team_id === null && lastBatId !== bat.id && curr_month > match_month) {

                check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter)
                setLastBatId(bat.id)

        }
        else if (match_day_in_month === curr_day_in_month && match_hour + 6 <= curr_hour && bat.winning_team_id === null && lastBatId !== bat.id) {

                check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter)
                setLastBatId(bat.id)

        }
        else if (bat.winning_team_id !== null && winnerTeam === null) {
        
            bat_steel_good = "true";
            setWinnerTeam(bat.winning_team_id)
            console.log("not invoke check_Winner winning team id from data base", winnerTeam, "<==>", bat.winning_team_id)
        }


    }
    else {

        if (match_year <= curr_year &&
            match_month <= curr_month &&
            match_day_in_month < curr_day_in_month &&
            bat.match_ok !== "true"

        )   
        {

            bat_steel_good = "false"
        }
        else {
            if (match_day_in_month >= curr_day_in_month && bat.match_ok === "false") {  //match_hour

                if (match_day_in_month === curr_day_in_month && match_hour >= curr_hour && match_minute >= curr_minute < 10) {

                    bat_steel_good = "true"
                }

                else if (match_day_in_month > curr_day_in_month && match_month >= curr_month) {

                    bat_steel_good = "true"
                }
                else {

                    bat_steel_good = "false"
                    return
                }


            } else {
                if (bat.match_ok === "false") {
        
                    bat_steel_good = "false"
                }



            }

            bat_steel_good = "true";
            console.log(bat_steel_good, "bat_id ", bat.id, "match is good to go _____________________________________")

        }
    }

    async function deleteBat(getUserBats ,setUser_data , setJoinBat, setMyBat, myBat, joinBat, user_data , setShowAccount , bat) {
        let combine = ""
       
        const {data , error_01} = await supabase
        .from("accounts")
        .select("tokens")
        .eq("user_id", bat.user_id)
        console.log("bat user id " , bat.user_id , "data_01 " , data[0].tokens)
       
        const { error } = await supabase
        .from('bat_list')
        .delete()
        .eq ('id' , bat.id)
        console.log("cancel bat :" , bat.id , user_data.id)


     

        const {data: tokens , up_error} = await supabase
        .from("accounts")
        .update({tokens: data[0].tokens + bat.tokens})
        .eq("user_id", bat.user_id)
        .select()
            
            getUserBats(setUser_data, setJoinBat, setMyBat)
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
                        {bat.match_ok === "true" ? <div> </div> : <button className="btn" style={{ backgroundColor: "gray" }} onClick={()=> deleteBat(getUserBats ,setUser_data, setMyBat, setJoinBat, myBat, joinBat, user_data , setShowAccount , bat) }>00cancel</button>}  {/* {bat.id}*/}
                        {/* {winnerTeam !== null ? winnerTeam === userTeam ? <div> you WIN</div> : <div> You lose</div> : <div>  </div>} */}
                        {winnerTeam !== null ? bat.user_id === user_data.id && winnerTeam === bat.chosen_team_id || bat.opp_user_id === user_data.id && winnerTeam === bat.opp_team_id ? 
                        <div> you WIN</div> : <div> You lose</div> : <div>  </div>}
                        {console.log(bat.user_id , user_data.id , winnerTeam, bat.chosen_team_id , bat.opp_user_id , user_data.id, bat.opp_team_id)}
                    </div>
                </div> </> : <div></div>}

        </div>
    )
}

// if(bat.user_id === user.id && winnerTeam === bat.team_id || bat.opp_user_id === user.id && winnerTeam === bat.opp_team_id)

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

    //bat.user_id === user_data.id && winnerTeam === bat.chosen_team_id || bat.opp_user_id === user_data.id && winnerTeam === bat.opp_team_id 
    // if (userTeam === winnerTeamData?.id) {
    if (bat.user_id === user_data.id && winnerTeamData.id === bat.chosen_team_id || bat.opp_user_id === user_data.id && winnerTeamData.id === bat.opp_team_id) {
        const { up_data: updata_tokens, up_error } = await supabase
            .from('accounts')
            .update({ tokens: getTokens + (wins_tokens * 2) })
            .eq("user_id", user_data.id)
            .select()

        console.log("AAAAAAA wins tokens :", wins_tokens)
        console.log("user tokens :", u_tokens)
        console.log("total tokens :", getTokens + (wins_tokens *2))
        const {data: fee_recored, error} = await supabase
        .from("incoming")
        .insert([
           {bat_id: bat.id},
           {user_id : user_data.id},
           {tokens : (wins_tokens * 2)},
           {fee: (wins_tokens * 2) / 100 * 5},
        ])
        .select()
    }
    else {
        const { up_data: updata_tokens, up_error } = await supabase
            .from('accounts')
            .update({ tokens: getTokens + (wins_tokens) })
            .eq("user_id", bat.opp_user_id)
            .select()

        console.log("BBBBBBBBB wins tokens :", wins_tokens)
        console.log("user tokens :", u_tokens)
        console.log("total tokens :", getTokens )

         const {data: fee_recored, error} = await supabase
        .from("incoming")
        .insert([
           {bat_id: bat.id},
           {user_id : user_data.id},
           {tokens : (wins_tokens * 2)},
           {fee: (wins_tokens * 2) / 100 * 5},
        ])
        .select()    
    }


}