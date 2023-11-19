import { useState } from "react";
import supabase from "../../services/supabase";
import React from 'react';
import { check_Winner } from "./UserAccount";

export default function SingelBat_Open({ getUserBats, setUser_data, setJoinBat, setMyBat, user_data, userTeam, userTeamName, bat }) {
    // function SingelBat_Open({getUserBats ,setUser_data , setJoinBat,setMyBat , myBat, joinBat, user_data, userTeam, userTeamName, bat , setShowAccount }) {
    const [winnerTeam, setWinnerTeam] = useState(null);
    const [winnerTeamData, setWinnerTeamData] = useState({});
    const [lastBatId, setLastBatId] = useState();
    const [counter, setCounter] = useState(0);
    const [winnerEmail, setWinnerEmail] = useState("");
    const [teamImage, setTeamImage] = useState("");
    const [teamName, setTeamName] = useState("");


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
    const curr_minute = date.getMinutes(date);


    if (bat.match_ok === "true" && lastBatId != bat.id) {

        bat_steel_good = "true";

        if (match_day_in_month < curr_day_in_month && bat.winning_team_id === null && lastBatId !== bat.id ||
            match_day_in_month >= curr_day_in_month && bat.winning_team_id === null && lastBatId !== bat.id && curr_month > match_month) {

            check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter, setWinnerEmail, setTeamImage, setTeamName);
            setLastBatId(bat.id);

        }
        else if (match_day_in_month === curr_day_in_month && match_hour + 6 <= curr_hour && bat.winning_team_id === null && lastBatId !== bat.id) {

            check_Winner(user_data, userTeam, winnerTeamData, setWinnerTeamData, setWinnerTeam, bat, lastBatId, setCounter, counter, setWinnerEmail, setTeamImage, setTeamName);
            setLastBatId(bat.id);

        }
        else if (bat.winning_team_id !== null && winnerTeam === null) {

            bat_steel_good = "true";
            setWinnerTeam(bat.winning_team_id);
            getWinnerEmail();
            // console.log("not invoke check_Winner winning team id from data base", winnerTeam, "<==>", bat.winning_team_id)
        }


    }
    else {

        if (match_year <= curr_year &&
            match_month <= curr_month &&
            match_day_in_month < curr_day_in_month &&
            bat.match_ok !== "true") {

            bat_steel_good = "false";
        }
        else {
            if (match_day_in_month >= curr_day_in_month && bat.match_ok === "false") { //match_hour

                if (match_day_in_month === curr_day_in_month && match_hour >= curr_hour && match_minute >= curr_minute < 10) {

                    bat_steel_good = "true";
                }

                else if (match_day_in_month > curr_day_in_month && match_month >= curr_month) {

                    bat_steel_good = "true";
                }
                else {

                    bat_steel_good = "false";
                    return;
                }


            } else {
                if (bat.match_ok === "false") {

                    bat_steel_good = "false";
                }



            }

            bat_steel_good = "true";
            // console.log(bat_steel_good, "bat_id ", bat.id, "match is good to go _____________________________________")
        }
    }

    async function getWinnerEmail() {
        const { data: windata, error } = await supabase
            .from("incoming")
            .select("*")
            .eq("bat_id", bat.id);
        // console.log("windata ======>>>>>> ", windata[0]);
        // console.log("windata ======>>>>>> ", windata)
        setWinnerEmail(windata[0].winner_email);
        setTeamImage(windata[0].winner_team_image);
        setTeamName(windata[0].winner_team_name);
    }

    async function deleteBat() {
        // async function deleteBat(getUserBats ,setUser_data , setJoinBat, setMyBat, myBat, joinBat, user_data , setShowAccount , bat) {
        let combine = "";

        const { data, error_01 } = await supabase
            .from("accounts")
            .select("tokens")
            .eq("user_id", bat.user_id);
        // console.log("bat user id " , bat.user_id , "data_01 " , data[0].tokens)
        const { error } = await supabase
            .from('bat_list')
            .delete()
            .eq('id', bat.id);
        // console.log("cancel bat :" , bat.id , user_data.id)
        const { data: tokens, up_error } = await supabase
            .from("accounts")
            .update({ tokens: data[0].tokens + bat.tokens })
            .eq("user_id", bat.user_id)
            .select();

        getUserBats(setUser_data, setJoinBat, setMyBat);
    }
    //bat.user_id === user_data.id && winnerTeamData.id === bat.chosen_team_id || bat.opp_user_id === user_data.id && winnerTeamData.id === bat.opp_team_id
    // console.log("bat.user_id :", bat.user_id);
    // console.log("user_data.id :", user_data.id);
    // console.log("winnerTeamData.id :", winnerTeamData.id);
    // console.log("bat.chosen_team_id :", bat.chosen_team_id);
    // console.log("bat.opp_user_id :", bat.opp_user_id);
    // console.log("bat.opp_team_id :", bat.opp_team_id);
    // console.log("bat.opp_user_id :", bat.opp_user_id);
    // console.log(bat.user_id === user_data.id);
    // console.log(winnerTeamData.id === bat.chosen_team_id);
    // console.log(bat.opp_user_id === user_data.id);
    // console.log(winnerTeamData.id === bat.opp_team_id);

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
                    <div className="account-col col-3">    {/*                                                      deleteBat(getUserBats ,setUser_data, setMyBat, setJoinBat, myBat, joinBat, user_data , setShowAccount , bat) */}
                        {bat.match_ok === "true" ? <div> </div> : <button className="btn" style={{ backgroundColor: "gray" }} onClick={() => deleteBat()}>00cancel</button>}  {/* {bat.id}*/}

                        {winnerTeam !== null ? winnerEmail === user_data.email ?
                            // {winnerTeam !== null ? bat.user_id === user_data.id && winnerTeamData.id === bat.chosen_team_id || bat.opp_user_id === user_data.id && winnerTeamData.id === bat.opp_team_id ? 
                            <div> you WIN
                                <img className="team1-image w-12 h-12 m-auto flex flex-row" src={teamImage} alt="team image" />
                            </div> : <div> You lose</div> : <div>  </div>}
                    </div>
                </div> </> : <div></div>}

        </div>
    );
}
