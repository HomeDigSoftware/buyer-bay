import React, { useEffect, useState } from 'react';
import Logo from './logo-package-GOLD/png/logo-no-background.png';
import "./App.css"
import AddTokens from "./component/gamesData/AddTokens"
import ShowUserTokens from './component/gamesData/ShowUserTokens';
import BatUpdate from './component/gamesData/BatUpdate';
import UserAccount from './component/gamesData/UserAccount';
import supabase from './services/supabase';

export function SiteHeader() {
    const [userTokens, setUserTokens] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => { 
      async function getUserData() {
        await supabase.auth.getUser().then((value) => {
          if (value.data?.user) {
            console.log(" This is the supauser : " ,value.data.user.aud)
            setUser(value.data.user.aud)
            // return
            getTokens(user);
          }
        })
      }
      getUserData();
    }, [])

  return (

    <header className="border-bottom lh-1 py-3">
      <div className="main-header row flex-nowrap justify-content-between align-items-center text-center">
        <div className="col-3 pt-1">
           <ShowUserTokens userToken={userTokens}/>
            <AddTokens userTokens={userTokens} setUserTokens={setUserTokens}/>
            <BatUpdate />
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
