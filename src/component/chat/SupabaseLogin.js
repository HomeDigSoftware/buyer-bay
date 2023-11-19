import React, { useEffect, useState, useRef } from "react";
import supabase from "../../services/supabase.js";
import '../../App.css';
import GoogleLogo from "../../logo-package-GOLD/Singin-logos/btn_google_signin_dark_pressed_web.png";
import DiscordLogo from "../../logo-package-GOLD/Singin-logos/discord-logo-png-7618.png";
import TwichLogo from "../../logo-package-GOLD/Singin-logos/pngfind.com-facebook-logo-png-transparent-579959.png";


export default function SupaBaseSingIn() {
  const [supaUser, setsupaUser] = useState({});
  const [newDbMessage, setNewDbMessage] = useState("");
  const [dbMessage, setDbMessage] = useState({});
  const [click, setClick] = useState(false);

  const HandleSingIn = async () => {

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    // console.log(data);
  }

  const handleTwichSingIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitch',
    })
  }

  const handleDiscordSingIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  }

  async function handleSingOutUser() {
    const { error } = await supabase.auth.signOut();
    setsupaUser({});
    setClick(false);
  }

  const getAllMessages = async () => {
    if (supaUser.aud === "authenticated") {
      let { data: messages, error } = await supabase
        .from('messages')
        .select('*')
      messages.map((data) => {
        // console.log(data);
      })
      dbDataMessages(messages);
    }
  }

  function dbDataMessages(dbData) {
    setDbMessage(dbData)
    setClick(true)
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          message: newDbMessage,
          name: supaUser.user_metadata.name,
          avatar: supaUser.user_metadata.avatar_url,
          created_at: supaUser.created_at,
          uid: supaUser.id
        }
      ])
      .select()
    setNewDbMessage("");
    // console.log("sending", supaUser.aud)
    getAllMessages();
  }

  async function openUserAccount() {
    let the_user = {}
    await supabase.auth.getUser().then((value) => {
      if (value.data?.user) {

        the_user = value.data.user;

      }
    })
    const { data, error } = await supabase
    .from('accounts')
    .select('user_id')
    .eq('user_id', the_user.id) 
   
    if(data.length === 0 && the_user.aud === "authenticated"){
      // console.log("its going throug" ,the_user );
       const { data, error } = await supabase
        .from('accounts')
        .insert([
          {
            user_id: the_user.id,
            user_name: the_user.user_metadata.name,
            tokens: 2000,
            email: the_user.email,
          },
        ])
        .select()
    }
    else{
      if(the_user.aud === "authenticated"){
        setsupaUser(the_user)
      }
    }
  }
  //_________________________________________________________________________
  useEffect(() => {
    async function getUserData() {


      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setsupaUser(value.data.user)
        }
      })
    }
    getUserData();
    openUserAccount();
  }, [])
  //_________________________________________________________________________
  supabase.auth.onAuthStateChange(async (event) => {
    // console.log("supabase event ===> ", event)
    if (event === "SINGED_OUT") {
      console.log("user has log out")
    }

    if (event === "SIGNED_IN") {

      // setsupaUser(supaUser)
      // console.log(" 158 SIGNED_IN ====> ", supaUser.aud, supaUser)
    }

    if (event === "INITIAL_SESSION") {
      // console.log("INITIAL_SESSION")
    }
  })
  return (
    <div>
      <div>
        {supaUser.aud === "authenticated" ? <h5> {supaUser.aud}</h5> : <h4> Not authenticated</h4>}
      </div>
      {supaUser.aud === "authenticated" ? <div><SingoutButton onSingOut={handleSingOutUser} /></div> : 
      <div> <LoginButton onSingin={HandleSingIn} /> 
            <TwichLoginButton onTwichSingin={handleTwichSingIn} />
            <DiscordLoginButton onDiscordSingin={handleDiscordSingIn} />
      </div>}
      <GetDBMessages onGetMessagees={getAllMessages} dbMessage={dbMessage} supaUser={supaUser} click={click} />
      <form onSubmit={(e) => handleSendMessage(e)} className="send-message">
        <label htmlFor="messageInput" hidden>
          Supabase Enter Message
        </label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="type message..."
          value={newDbMessage}
          onChange={(e) => setNewDbMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}


function GetDBMessages({ onGetMessagees, dbMessage, supaUser, click }) {
  const scroll = useRef();

  return (
    <div>
      <button style={{ backgroundColor: "gray" }} onClick={onGetMessagees}>
        get old messagees
      </button>
      <div>
        {click ? <div> {dbMessage.map((dbMessagedata) => (
          <ChatMessages dbMessagedata={dbMessagedata}
            key={dbMessagedata.id}
            supaUser={supaUser}
          />))}  </div> : <div> </div>}
      </div>
      <span ref={scroll}></span>
    </div>
  )
}

function SingoutButton({ onSingOut }) {
  return (
    <div className='valorant-card'>
      <button className="data-btn" onClick={onSingOut}>
        Supabaes Singout
      </button>
    </div>
  );
}

function LoginButton({ onSingin }) {
  return (
    <div className='google-singin-logo '>
      <img className="google-singin-logo " src={GoogleLogo} alt="login logo" onClick={onSingin} />
    </div>
  );
}

function TwichLoginButton({ onTwichSingin }) {
  return (
    <div className=''>
        <img className="twich-singin-logo" src={TwichLogo} alt="login logo" onClick={onTwichSingin} />
    </div>
  );
}

function DiscordLoginButton({onDiscordSingin}){
  return(
    <div>

       <img className="discord-singin-logo  " src={DiscordLogo} alt="login logo" onClick={onDiscordSingin} />
    </div>
  )
}

function ChatMessages({ dbMessagedata, supaUser }) {
  return (
    <div>
      <div>
      </div>
      <div>
        <div>
          <div className={`chat-bubble ${dbMessagedata?.uid === supaUser.id ? "right" : ""}`}>
            <img
              className="chat-bubble__left"
              src={dbMessagedata?.avatar}
              alt="user avatar"
            />
            <div className="chat-bubble__right">
              <p className="user-name">{dbMessagedata?.name}</p>
              <p className="user-message">{dbMessagedata?.message} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}