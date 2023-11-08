import React, { useEffect, useState, useRef } from "react";
import supabase from "../../services/supabase.js";
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
    if (supaUser.aud === "authenticated") {
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

  async function openUserAccount() {
    let the_user = {}
    await supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        console.log(" This is the supauser : ", value.data.user)
        // setsupaUser(value.data.user)
        the_user = value.data.user;
        // setsupaUser(the_user)
        // return
      }
    })
    const { data, error } = await supabase
    .from('accounts')
    .select('user_id')
    .eq('user_id', the_user.id) 
    console.log("NEW API CALL ====> " , data ,data.length ,"<= data.length: the_user.length => ", the_user , the_user.email)
   
    if(data.length === 0 && the_user.aud === "authenticated"){
      console.log("its going throug" ,the_user );
       const { data, error } = await supabase
        .from('accounts')
        .insert([
          {
            user_id: the_user.id,
            user_name: the_user.user_metadata.name,
            tokens: 2000,
            email: the_user.email,
            // bating_list: '',
          },
        ])
        .select()
        // setsupaUser(the_user)
    }
    else{
      if(the_user.aud === "authenticated"){
        setsupaUser(the_user)
      }
      console.log("you have an account :) great", );//the_user.user_metadata.name
    }
    // let { data: accounts, error } = await supabase
    //   .from('accounts')
    //   .select('user_id')

    // console.log("accounts ++====>", accounts, "=========> ", the_user)

    // accounts.map((userid) => create_New_User(userid, the_user) )

  }

//   async function create_New_User(userid, the_user) {
//     console.log("create_New_User ==> ", userid.user_id)
//     console.log("create_New_User ==> ", the_user?.id)

//     if (the_user.id !== userid.user_id) {
//       console.log("Create account : ")
//       console.log(the_user.id, " <== the_user_id  : userid.user_id ==> ", userid.user_id)

//   }
// }
  //_________________________________________________________________________
  useEffect(() => {
    async function getUserData() {


      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(" This is the supauser : ", value.data.user)
          setsupaUser(value.data.user)
          // return
        }
      })

    }
    console.log("use effect")
    getUserData();
    openUserAccount();

    // getAllMessages();

  }, [])
  //_________________________________________________________________________


  supabase.auth.onAuthStateChange(async (event) => {
    console.log("supabase event ===> ", event)
    if (event === "SINGED_OUT") {
      console.log("user has log out")
    }


    if (event === "SIGNED_IN") {

      // setsupaUser(supaUser)
      console.log(" 158 SIGNED_IN ====> ", supaUser.aud, supaUser)
    }


    if (event === "INITIAL_SESSION") {
      console.log("INITIAL_SESSION")

    }
  })
  return (
    <div>
      <div>
        {supaUser.aud === "authenticated" ? <h5> {supaUser.aud}</h5> : <h4> Not authenticated</h4>}
      </div>
      {supaUser.aud === "authenticated" ? <div><SingoutButton onSingOut={handleSingOutUser} /></div> : <div> <LoginButton onSingin={HandleSingIn} />
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
    <div className='valorant-card'>
      <button className="data-btn" onClick={onSingin}>
        Supabaes Login with google
      </button>
    </div>
  );
}



function ChatMessages({ dbMessagedata, supaUser }) {
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