import React, { useState } from 'react';
import supabase from '../../services/supabase.js';



export default function OpenBatsCard({ matchOpenBats, matchData, setHaveOpenBats, setShowPanel }) {
  const [localUser, setLocalUser] = useState("");

  console.log("local user =======>>>>>> ", localUser);
  let team_image = "";
  console.log("matchOpenBats.match_ok === false && matchOpenBats.match_id === matchData.id");
  console.log("matchOpenBats.match_ok ==> ", matchOpenBats.match_ok);
  console.log(matchOpenBats.match_id, " <= matchOpenBats.match_id === matchData.id => ", matchData.id);

  if (matchOpenBats.match_ok === "false" && matchOpenBats.match_id === matchData.id) {

    console.log("AAAAAAA");

    return (

      <div className=' team-1  row'>
        <div className='col-4'>
          <button onClick={() => updateBat_List(matchOpenBats, setHaveOpenBats, setShowPanel)} className='token-btn'>bat on</button>
        </div>

        <div className=' team-1  col-4'>
          {matchOpenBats.chosen_team_id === matchData.opponents[0].opponent.id ?
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
            </div>}
        </div>

        <div className='col-4'>
          <h3 style={{ color: "black", paddingTop: "10px", margin: "auto" }}>{matchOpenBats.tokens}</h3>
        </div>
      </div>

    );
  }


  async function updateBat_List(matchOpenBats, setHaveOpenBats, setShowPanel) {

    console.log('__________updateBat_List _______');
    console.log('matchOpenBats', matchOpenBats);

    let user = "";
    let userTokens = "";


    await supabase.auth.getUser().then((value) => {

      if (value.data?.user) {
        user = value.data.user;
        console.log(" This is the supauser : ", user);
      }
    });



    let { data, error } = await supabase
      .from("accounts")
      .select("tokens")
      .eq('user_id', user.id);

    userTokens = data[0];
    console.log(" get tokens => ", userTokens);
    postBat(userTokens, matchOpenBats, user, setHaveOpenBats, setShowPanel);

  }

  function postBat(userTokens, matchOpenBats, user, setHaveOpenBats, setShowPanel) {
    console.log('__________postBat _______');
    console.log('userTokens', userTokens);
    console.log('matchOpenBats', matchOpenBats);
    console.log('user', user);


    theBat(userTokens, matchOpenBats, user, setHaveOpenBats, setShowPanel);
  }

  async function theBat(userTokens, matchOpenBats, user, setHaveOpenBats, setShowPanel) {

    console.log('__________the bat _______');
    console.log('userTokens', userTokens);
    console.log('matchOpenBats', matchOpenBats);

    console.log('user', user.id);


    console.log(' user data', userTokens.tokens, matchOpenBats.tokens);
    if (user.id !== matchOpenBats.user_id) {
      if (userTokens.tokens >= matchOpenBats.tokens) {

        const { error } = await supabase
          .from('bat_list')
          .update({ match_ok: "true" })
          .eq("id", matchOpenBats.id) // bat_id
          .select();

        const { error02 } = await supabase
          .from("bat_list")
          .update({ opp_user_id: user.id })
          .eq("id", matchOpenBats.id) //bat_id
          .select();

        const { error03 } = await supabase
          .from("bat_list")
          .update({ opp_email: user.user_metadata.email })
          .eq("id", matchOpenBats.id) //bat_id
          .select();

        setHaveOpenBats(false);
        setShowPanel(false);
        console.log("from Quick Matching", matchOpenBats.id);

      }
      else {
        console.log("you dont have enoufe money ", userTokens);
        return;
      }

    } else {
      console.log("you open the bat :) cant bat on it ");
    }
  }


}
