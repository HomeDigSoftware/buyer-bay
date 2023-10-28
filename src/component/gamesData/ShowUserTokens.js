import AddTokens from "./AddTokens"
import React, { useEffect, useState , useRef } from "react";
import supabase from "../../services/supabase";


export default function ShowUserTokens({userToken}){
   

    return(
        <div>
            <div > {userToken !== "" ? <div> {userToken} </div> 
              : <div> </div>}
            </div>
        </div>
    )
}