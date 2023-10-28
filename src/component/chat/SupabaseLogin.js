import React, { useEffect, useState , useRef } from "react";
import supabase from "../../services/supabase";
import '../../App.css'

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
    console.log(data);

  }

  async function handleSingOutUser() {
    const { error } = await supabase.auth.signOut();
    setsupaUser({});
    setClick(false);
  }

  
  const getAllMessages = async () => {
      if(supaUser.aud === "authenticated"){
      let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      messages.map((data) => {
        console.log(data);
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
    console.log("sending", supaUser.aud)
    getAllMessages();
  }
//_________________________________________________________________________
useEffect(() => { 
  async function getUserData() {


      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(" This is the supauser : " ,value.data.user)
          setsupaUser(value.data.user)
          // return
        }
      })
    
    }
      getUserData(); 
      getAllMessages();
}, [])
//_________________________________________________________________________


  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SINGED_OUT") {
      console.log("user has log out")
    }
    else {
      console.log(supaUser.aud)
      //    getAllMessages();
    }
  })
  return (
    <div>
      <div>
      {supaUser.aud === "authenticated" ? <h5> {supaUser.aud}</h5> : <h4> Not authenticated</h4>}
      </div>
     {supaUser.aud === "authenticated" ? <div><SingoutButton onSingOut={handleSingOutUser} /></div> : <div> <LoginButton onSingin={HandleSingIn} />
       </div>}
      <GetDBMessages onGetMessagees={getAllMessages} dbMessage={dbMessage} supaUser={supaUser} click={click}  />
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
      <button onClick={onGetMessagees}>
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
    <div className='valorant-card'>
      <button className="data-btn" onClick={onSingin}>
        Supabaes Login with google
      </button>
    </div>
  );
}



function ChatMessages({ dbMessagedata, supaUser  }) {
  // const scroll = useRef();
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
              <p className="user-message">{dbMessagedata?.message}
              
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}