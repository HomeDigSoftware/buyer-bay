import { useState } from "react"
import supabase from "../../services/supabase";
import React from 'react';
import '../../App.css';
import axios from 'axios';
import SingelBat_Open from "./SingelBat_Open";

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


// if(bat.user_id === user.id && winnerTeam === bat.team_id || bat.opp_user_id === user.id && winnerTeam === bat.opp_team_id)

export async function check_Winner(user_data, userTeam, setWinnerTeamData, setWinnerTeam, bat, lastBatId ,setWinnerEmail, setTeamImage ,setTeamName) {

    // console.log("AAAAAAAAAAAAAa start lastBatId === bat.id", bat)
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
            winnerUpdate(bat, user_data, userTeam, text.upcoming.winner, bat.tokens, setWinnerEmail, setTeamImage ,setTeamName)
        }
    }


}

// //__________________________________________________________________________________________________________________________________________________________



async function winnerUpdate(bat, user_data, userTeam, winnerTeamData, wins_tokens, setWinnerEmail, setTeamImage ,setTeamName) {
    console.log("user_data", user_data);
    console.log("userTeam", userTeam);
    console.log("winnerTeamData", winnerTeamData);
    console.log("wins_tokens", wins_tokens);
    console.log("match slug", bat.match_slug);
    console.log("opp email", bat.opp_email);
    let winner_team_image = winnerTeamData.image_url;
    let winner_team_name = winnerTeamData.name;
    let getTokens = null;
    let total_wins = (wins_tokens * 2);
    let fee = (total_wins / 100) * 5

    console.log("from the update ", winnerTeamData, winnerTeamData.id)
    const { w_data, update_error } = await supabase
        .from('bat_list')
        .update({ winning_team_id: winnerTeamData.id })
        .eq("match_id", bat.match_id)
        .select()

   
    // if (bat.user_id === user_data.id && winnerTeamData.id === bat.chosen_team_id || bat.opp_user_id === user_data.id && winnerTeamData.id === bat.opp_team_id) {
    if ( winnerTeamData.id === bat.chosen_team_id ) {
      
        const { data: u_tokens, t_error } = await supabase
        .from('accounts')
        .select('tokens')
        .eq('user_id', bat.user_id)
           
     
        getTokens = u_tokens[0].tokens 
    
    
    
        const { up_data: updata_tokens, up_error } = await supabase
            .from('accounts')
            .update({ tokens: getTokens + total_wins - fee})
            .eq("user_id", bat.user_id)
            .select()

        console.log("AAAAAAA wins tokens :", total_wins )
        console.log("AAA fee :", fee)
        console.log("AAA total tokens user tokens :",  getTokens + total_wins - fee )
        console.log("AAA bat.id:", bat.id )
        console.log("AAA user_data.id:", user_data.id )
        console.log("AAA total_wins:",  total_wins )
        console.log("AAA winner_team_image,:", winner_team_image )
        console.log("AAA bat.match_slug", bat.match_slug )
        console.log("AAA user_data.email :", bat.email )
     
     
        const {data: fee_recored, error} = await supabase
        .from("incoming")
        .insert([{     
           bat_id: bat.id,
           user_id : bat.user_id,
           tokens : total_wins,
           fee: fee,
           winner_team_image : winner_team_image,
           winner_team_name: winner_team_name,
           match_slug: bat.match_slug,
           winner_email: bat.email,
        }])
        .select()
        setWinnerEmail(bat.email)
      
        setTeamImage(winner_team_image)
        setTeamName(winner_team_name)
        console.log("her comess the moneyyyyy " , fee )
    }
    else {
       
        const { data: u_tokens, t_error } = await supabase
        .from('accounts')
        .select('tokens')
        .eq('user_id', bat.opp_user_id)
   
        getTokens = u_tokens[0].tokens 

        const { data: updata_tokens, up_error } = await supabase
            .from('accounts')
            .update({ tokens: getTokens + total_wins - fee })
            .eq("user_id", bat.opp_user_id)
            .select()

        console.log("BBBBBBBBB  wins tokens :", total_wins )
        console.log("BBB fee :", fee)
        console.log("BBB total tokens user tokens :",  getTokens + total_wins - fee )
        console.log("BBB bat.id:", bat.id )
        console.log("BBB user_data.id:", user_data.id )
        console.log("BBB total_wins:",  total_wins )
        console.log("BBB winner_team_image,:", winner_team_image )
        console.log("BBB bat.match_slug", bat.match_slug )
        console.log("BBB user_data.email :", bat.opp_email )
     

         const {data: fee_recored, error} = await supabase
        .from("incoming")
        .insert([{
           bat_id: bat.id,
           user_id : bat.opp_user_id,
           tokens : total_wins,
           fee: fee,
           winner_team_image : winner_team_image,
           winner_team_name: winner_team_name,
           match_slug: bat.match_slug,
           winner_email: bat.opp_email,
          }])
        .select()    
         setWinnerEmail(bat.opp_email)
         setTeamImage(winner_team_image)
         setTeamName(winner_team_name)
       
        console.log("her comess the moneyyyyy " , fee )
    }


}