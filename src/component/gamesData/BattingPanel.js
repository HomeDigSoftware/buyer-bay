import { useState } from 'react'
import '../../App.css'
// import { setUserId } from 'firebase/analytics';
import supabase from '../../services/supabase.js';
// import axios from 'axios';
// import { wait } from '@testing-library/user-event/dist/utils';

export default function BattingPanel({ setShowPanel, data, showPanel }) {
    const [glow_Team1, setGlow_Team1] = useState("w-20 h-20 m-auto ");
    const [glow_Team2, setGlow_Team2] = useState("w-20 h-20 m-auto ");
    const [chosenTeam, setChosenTeam] = useState("");
    const [chosenTeamName, setChosenTeamName] = useState("");
    const [chosenTeamImage, setChosenTeamImage] = useState("");
    const [oppTeam, setOppTeam] = useState('');
    const [oppTeamName, setOppTeamName] = useState('');
    const [oppTeamImage, setOppTeamImage] = useState('');
    const [battingUser, setBattingUser] = useState("");
    const [begin_at, setBegin_at] = useState(data.begin_at);
    const [team_01_ID, setTeam_01_ID] = useState(data.opponents[0].opponent.id)
    const [team_01_Name, setTeam_01_Name] = useState(data.opponents[0].opponent.name);
    const [team_02_ID, setTeam_02_ID] = useState(data.opponents[1].opponent.id);
    const [team_02_Name, setTeam_02_Name] = useState(data.opponents[1].opponent.name);
    const [matchID, setMatchID] = useState(data.id);
    const [amount, setAmount] = useState("");
    const [team, setTeam] = useState("");
    const [leagueId, setLeagueId] = useState(data.league.id)
    const [tournament_Id, setTournament_Id] = useState(data.tournament_id)
    const [videoGame, setVideoGame] = useState(data.videogame.id)
    const [matchSlug, setMatchSlug] = useState(data.slug);
    const [user, setUser] = useState("");
    
    return (
        <>
            <div className="batting-background ">
                <div className="batiing-p m-auto">
                    <h2>Pick your Winner</h2>
                    <div className="flex flex-row">
                        <div className="team-1  text-center m-auto">
                            <img
                                className={glow_Team1}
                                src={data.opponents[0]?.opponent.image_url}
                                alt={data.id}
                                onClick={() =>
                                    choseTeam(
                                        setTeam,
                                        setBattingUser,
                                        setAmount,
                                        matchID,
                                        chosenTeam,
                                        chosenTeamName,
                                        begin_at,
                                        team_01_ID,
                                        team_01_Name,
                                        team_02_ID,
                                        team_02_Name,
                                        setChosenTeam,
                                        setChosenTeamName,
                                        setChosenTeamImage,
                                        setGlow_Team1,
                                        setGlow_Team2,
                                        setOppTeam,
                                        setOppTeamName,
                                        setOppTeamImage,
                                        data,
                                        "team_1",
                                    )
                                }
                            />
                            <h3 className="teams-names">
                                {data.opponents[0]?.opponent.name} {showPanel}
                            </h3>
                        </div>

                        <div className=" team-2 text-center m-auto">
                            <img
                                className={glow_Team2}
                                src={data.opponents[1]?.opponent.image_url}
                                alt={data.id}
                                onClick={() =>
                                    choseTeam(
                                        setTeam,
                                        setBattingUser,
                                        setAmount,
                                        matchID,
                                        chosenTeam,
                                        chosenTeamName,
                                        begin_at,
                                        team_01_ID,
                                        team_01_Name,
                                        team_02_ID,
                                        team_02_Name,
                                        setChosenTeam,
                                        setChosenTeamName,
                                        setChosenTeamImage,
                                        setGlow_Team1,
                                        setGlow_Team2,
                                        setOppTeam,
                                        setOppTeamName,
                                        setOppTeamImage,
                                        data,
                                        "team_2",
                                    )
                                }
                            />
                            <h3 className="teams-names">
                                {data.opponents[1]?.opponent.name}
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-row mt-10">
                        <button
                            onClick={() =>
                                get_UserData_And_Amount(setBattingUser, setAmount, 100)
                            }
                            className="token-btn-bat gap-10"
                        >
                            100 tokens
                        </button>
                        <button
                            onClick={() =>
                                get_UserData_And_Amount(setBattingUser, setAmount, 200)
                            }
                            className="token-btn-bat gap-10"
                        >
                            200 tokens
                        </button>
                        <button
                            onClick={() =>
                                get_UserData_And_Amount(setBattingUser, setAmount, 500)
                            }
                            className="token-btn-bat gap-10"
                        >
                            500 tokens
                        </button>
                        <button
                            onClick={() =>
                                get_UserData_And_Amount(setBattingUser, setAmount, 1000)
                            }
                            className="token-btn-bat gap-10"
                        >
                            1000 tokens
                        </button>
                    </div>
                    <div style={{ maxHeight: "150px" }}>
                        {amount === "" ? <div> </div> : <div>{amount} Tokens on </div>}
                    </div>
                    <div>
                        {team_01_ID === chosenTeam ? (
                            <img
                                className="w-20 h-20 m-auto"
                                src={data.opponents[0]?.opponent.image_url}
                                alt={data.id}
                            />
                        ) : (
                            <div> </div>
                        )}

                        {team_02_ID === chosenTeam ? (
                            <img
                                className="w-20 h-20 m-auto"
                                src={data.opponents[1]?.opponent.image_url}
                                alt={data.id}
                            />
                        ) : (
                            <div> </div>
                        )}
                    </div>

                    <div className="flex flex-row mt-64">
                        <button
                            onClick={() => closePanel(setShowPanel)}
                            className="token-btn send gap-10"
                        >
                            Close
                        </button>

                        <button
                            onClick={() =>
                               ( sendBat(matchSlug, battingUser, amount, chosenTeam, chosenTeamName, oppTeam, oppTeamName, begin_at, matchID, leagueId, tournament_Id, videoGame ,data)    
                           , closePanel(setShowPanel)) }
                            className="token-btn send gap-10"
                        >
                            Send BAT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

async function sendBat(matchSlug, battingUser, amount, chosenTeam, chosenTeamName, oppTeam, oppTeamName, begin_at, matchID, leagueId, tournament_Id, videoGame , match_data) {

    let updateTokens = ""

    let { data, error } = await supabase
        .from("accounts")
        .select("tokens")
        .eq('user_id', battingUser.id)

    console.log("START sendBat ", data[0].tokens)
    updateTokens = data[0].tokens
    if (data[0].tokens >= amount) {
        checkBattingList_For_a_Match(matchSlug, amount, chosenTeam, chosenTeamName, oppTeam, oppTeamName, battingUser, matchID, begin_at, leagueId, tournament_Id, videoGame, updateTokens ,match_data);
    }
    else {
        console.log("you dont have enoufe money ", data[0].tokens)
        return
    }
}

async function checkBattingList_For_a_Match(matchSlug, amount, chosenTeam, chosenTeamName, oppTeam, oppTeamName, battingUser, matchID, begin_at, leagueId, tournament_Id, videoGame, updateTokens ,match_data) {

    console.log("START checkBattingList_For_a_Match")

    let found_a_match = false;
    let bat_id = ""

    const { data, error } = await supabase
        .from("bat_list")
        .select('*')
    console.log(' from checking for a match  ', data);
    data.map((bat) => {
        if (bat.match_slug === matchSlug && bat.tokens === amount && bat.chosen_team_id !== chosenTeam && bat.match_ok === "false") { //&& bat.user_id != battingUser.id)
            console.log("we have a match for :", bat.tokens, "bat DB ID : ", bat.id)//,data.tokens
            found_a_match = true;
            bat_id = bat.id;
            //_____________________her enter updat func on the bat table 
        }})

    if (error) {
        console.log("the error is : ", error)
    }

    if (found_a_match === false) {
        console.log("hold tide will we post your bat ");
        console.log("looking for a match on : ", matchSlug, " for  ", amount, "bat id is ", bat_id)
        insertBat(bat_id, matchSlug, amount, chosenTeam, chosenTeamName, oppTeam, oppTeamName, battingUser, matchID, begin_at, leagueId, tournament_Id, videoGame, updateTokens ,match_data)
    }
    else {
        console.log("END checkBattingList_For_a_Match", bat_id)
        updateGotAmatch(bat_id, matchSlug, amount, chosenTeam, oppTeam, battingUser, matchID, begin_at, leagueId, tournament_Id, videoGame, updateTokens);
    }
    console.log("END checkBattingList_For_a_Match", bat_id)
}

async function updateGotAmatch(bat_id, matchSlug, amount, chosenTeam, oppTeam, battingUser, matchID, begin_at, leagueId, tournament_Id, videoGame, updateTokens) {
    let user_bating_list = '';

    const { data, update_error } = await supabase
        .from('bat_list')
        .update({ match_ok: "true"  })
        .eq("id", bat_id)
        .select()

    const { data_01 , update_01 } =await supabase
    .from("bat_list")
    .update( {opp_user_id : battingUser.id})
    .eq("id" , bat_id)
    .select()

    const { data_02 , update_02 } =await supabase
    .from("bat_list")
    .update( {opp_email : battingUser.user_metadata.email})
    .eq("id" , bat_id)
    .select()

    let { data: bat_list, error } = await supabase
        .from('accounts')
        .select('bating_list')
    user_bating_list = bat_list;

    const { update01, update_error01 } = await supabase
        .from("accounts")
        .update({ bating_list: (user_bating_list, " , ", bat_id) })
        .eq("user_id", battingUser.id)
        .select()

    console.log("END updateGotAmatch", bat_id, matchSlug, update_error, data)
}

async function insertBat(bat_id, matchSlug, amount, chosenTeam, chosenTeamName, oppTeam, oppTeamName, battingUser, matchID, begin_at, leagueId, tournament_Id, videoGame, updateTokens, match_data) {

    if (battingUser?.aud) {
        let hour = begin_at.slice( 11 , 13)
        let day = begin_at.slice( 8 , 10)
        let month = begin_at.slice( 5 , 7)
        let year = begin_at.slice( 0 , 4)
        let min = begin_at.slice( 14 , 16)
       
        const { update, update_error } = await supabase
            .from('accounts')
            .update({ tokens: (updateTokens - amount) })
            .eq("user_id", battingUser.id)
            .select()

        const { data, error } = await supabase
            .from('bat_list')
            .insert([
                { 
                    match_slug: matchSlug,
                    user_id: battingUser.id,
                    chosen_team_id: chosenTeam,
                    chosen_team_name: chosenTeamName,
                    opp_team_id: oppTeam,
                    opp_team_name: oppTeamName,
                    match_id: matchID,
                    tokens: amount,
                    match_time: begin_at,
                    league_id: leagueId,
                    tournament_id: tournament_Id,
                    videoGame_id: videoGame,
                    email: battingUser.user_metadata.email,
                    hour: hour,
                    day: day,
                    month: month,
                    year: year,
                    chosen_team_image: match_data.opponents[0].opponent.image_url,
                    opp_team_image : match_data.opponents[1].opponent.image_url,
                    minutes: min,
                }
            ])
            .select()
        console.log("you just send a bat ")
    }
    else {
        console.log("user aud is null probebly")
        return
    }
}

async function get_UserData_And_Amount(setBattingUser, setAmount, amount) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.aud) {
        console.log(user.id)
        set_UserData_And_Amount(user, setBattingUser, setAmount, amount)
    }
    else {
        // need to display a screen message you need to loged in 
        console.log("user aud is null probebly")
        return
    }
}

function set_UserData_And_Amount(user, setBattingUser, setAmount, amount) {
    setBattingUser(user);
    setAmount(amount)
}



function closePanel(setShowPanel) {
    setShowPanel(false)
}

function choseTeam(
        setTeam,
        setBattingUser,
        setAmount,
        matchID,
        chosenTeam,
        chosenTeamName,
        begin_at,
        team_01_ID,
        team_01_Name,
        team_02_ID,
        team_02_Name,
        setChosenTeam,
        setChosenTeamName,
        setChosenTeamImage,
        setGlow_Team1,
        setGlow_Team2,
        setOppTeam,
        setOppTeamName,
        setOppTeamImage,
        data,
        pickedTeam,
    ) {
        switch (pickedTeam) {
            case "team_1":
                setChosenTeam(team_01_ID);
                setChosenTeamName(team_01_Name);
                setChosenTeamImage(data.opponents[0]?.opponent.image_url)
                setGlow_Team1("team-image-glow w-20 h-20 m-auto");
                setGlow_Team2(" w-20 h-20 m-auto");
                setOppTeam(team_02_ID);
                setOppTeamName(team_02_Name);
                setOppTeamImage(data.opponents[1]?.opponent.image_url)
                console.log("user choose ", chosenTeam, "as the winner");
                setTeam(1);
                break;
            
            case "team_2":
                setChosenTeam(team_02_ID);
                setChosenTeamName(team_02_Name);
                setChosenTeamImage(data.opponents[1]?.opponent.image_url)
                setGlow_Team1("w-20 h-20 m-auto");
                setGlow_Team2("team-image-glow w-20 h-20 m-auto");
                setOppTeam(team_01_ID);
                setOppTeamName(team_01_Name);
                setOppTeamImage(data.opponents[0]?.opponent.image_url)
                console.log("user choose ", chosenTeam, "as the winner");
                setTeam(2);
                break;
        }
    };
