import React from 'react';
import supabase from '../../services/supabase';


export default function SendBat({matchOpenBats}){


    console.log('__________updateBat_List _______')
     updateBat_List(matchOpenBats)
    return(
        <div>
           hi {/* { updateBat_List(matchOpenBats)} */}
        </div>
    )
}


async function updateBat_List(   matchOpenBats) {
   
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
   postBat(userTokens , matchOpenBats , user );
   
}

function postBat(userTokens , matchOpenBats ,user ){
console.log('__________postBat _______')
console.log('userTokens' ,userTokens)
console.log('matchOpenBats' , matchOpenBats)
console.log('user' ,user)


 theBat(userTokens , matchOpenBats , user)
}

async function theBat(userTokens , matchOpenBats , user ){ 

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
     
    //  setHaveOpenBats(false)
    //  setShowPanel(false)
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




