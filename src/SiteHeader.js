import React, { useEffect, useState } from 'react';
import Logo from './logo-package-GOLD/png/logo-no-background.png';
import "./App.css"
import AddTokens from "./component/gamesData/AddTokens.js"
import ShowUserTokens from './component/gamesData/ShowUserTokens.js';
import BatUpdate from './component/gamesData/BatUpdate.js';
import UserAccount from './component/gamesData/UserAccount.js';
import supabase from './services/supabase.js';

export function SiteHeader() {
    const [userTokens, setUserTokens] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => { 
      async function getUserData() {
        await supabase.auth.getUser().then((value) => {
          if (value.data?.user) {
            console.log(" This is the supauser : " ,value.data.user)
            setUser(value.data.user.aud)
            // return
            getTokensDB(value.data.user , setUserTokens);
          }
        })
      }
      getUserData();
    
    }, [])

    
  async function getTokensDB(user , setUserTokens) {
    const { data, error } = await supabase
    .from('accounts')
    .select('tokens')
    .eq('user_id', user.id)    // Correct
    console.log("the _____from SITE HEADER __________data :: " , data[0]?.tokens)
    setUserTokens(data[0]?.tokens)
  }

  return (

    <header className="border-bottom lh-1 py-3">
      <div className="main-header row flex-nowrap justify-content-between align-items-center text-center">
        <div className="col-3 pt-1 flex flex-row">
          
            <AddTokens userTokens={userTokens} setUserTokens={setUserTokens}/>
            <BatUpdate />
          <div className='tokens-header m-auto' style={{fontSize:"18px", fontWeight:"800" , }}> You Have {"\n"} {userTokens}TK</div>
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



const getTokens = async (setUserTokens, setMessage ,user) => {
  // const { data: { user } } = await supabase.auth.getUser()
  

   console.log( "get-user-data", user)
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
