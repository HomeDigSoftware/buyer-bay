import AddTokens from "./AddTokens.js"
import React, { useEffect, useState , useRef } from "react";
import supabase from "../../services/supabase.js";


export default function ShowUserTokens({userToken}){
   

    return(
        <div>
            <div > {userToken !== "" ? <div> {userToken} </div> 
              : <div> </div>}
            </div>
        </div>
    )
}