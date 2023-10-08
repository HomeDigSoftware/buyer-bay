import React, { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import { Auth, AuthCard, MagicLink, SignIn } from "@supabase/auth-ui-react";
import ChatBox from "./ChatBox";
import '../../App.css'

export default function SupaBaseSingIn() {
  const [supaUser, setsupaUser] = useState({});
  const [dbMessage, setDbMessage] = useState({});

  const HandleSingIn = async () => {

    // supabase.auth.singIn({provider : 'google'})
    // supabase.auth.signInWithOAuth({
    //   provider: 'google',
    // })

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
  }


  async function getAllMessages() {

    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      setDbMessage({messages});
      messages.map((message) => {      
        console.log(message);
          <ChatMessages dbMessagedata={messages} 
                        key={message.id} 
                        supaUser={supaUser} />
      })
    
   //   console.log(setDbMessage)
 
  }

  async function handleSendMessage() {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          message: 'testing the auth',
          name: supaUser.user_metadata.name,
          avatar: supaUser.user_metadata.avatar_url,
          created_at: supaUser.created_at,
          uid: supaUser.id
        }
      ])
      .select()

    console.log("sending", supaUser.aud)
  }

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
  }, [])


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
      <LoginButton onSingin={HandleSingIn}/>
      <SingoutButton onSingOut={handleSingOutUser} />
      {/* <ChatMessages
        supaUser={supaUser}
        onSendMessage={handleSendMessage}
        getAllMessages={getAllMessages}
        dbMessage={dbMessage}
      /> */}
      {supaUser? <div> Not loged in </div> : <GetChatMessages supaUser={supaUser} dbMessage={dbMessage}/>}
      {/* <Auth
        supabaseClient={supabase}
        //  Auth, AuthCard, ForgottenPassword, MagicLink, SignIn, SignUp, SocialAuth, UpdatePassword, VerifyOtp
        appearance={{ theme: Auth }}
        theme="dark"
        providers={["google", "twitch"]}
     
      /> */}

    </div>
  )
}

{/* <div>
        {csgoMatch.map((data) => (
          <CsGo data={data} key={data.id} />
        ))}
      </div> */}

//  function CsgoGetMatch({ csgoMatch, onGetCsgoData }) {
//   return (
//     <div>
//       {/* <button className="data-btn" onClick={onGetCsgoData}>
//               CS-GO
//             </button> */}
//       <div>
//         {messages.map((message) => (
//           <ChatMessages message={message} key={message.id} />
//         ))}
//       </div>
//     </div>
//   );
// }
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
      Supabaes singIn
      </button>
    </div>
  );
}

function GetChatMessages({ supaUser, dbMessage }) {
 console.log(dbMessage)
  return (
    <div>
      {/* <button className="data-btn" onClick={onGetCsgoData}>
              CS-GO
            </button> */}
    {!supaUser ? <div> </div> :  <div>
        {dbMessage.map((dbMessagedata) => (
          <ChatMessages dbMessagedata={dbMessagedata}
                        key={dbMessagedata.id} 
                        supaUser={supaUser}
                        />
        ))}
      </div>}
    </div>
  );
}

function ChatMessages({ dbMessagedata, supaUser, onSendMessage, getAllMessages }) {
  return (
    <div>
      <div>
        ther is a user login
        <>
          <button style={{ backgroundColor: "gray", margin: "5px" }} onClick={onSendMessage}>Send</button>
        </>
      </div> 
        <div>
   
            <div>
              {console.log(supaUser?.aud)}
              <div className={`chat-bubble ${dbMessagedata?.id === supaUser.id ? "right" : ""}`}>
                <img
                  className="chat-bubble__left"
                  src={dbMessagedata?.avatar}
                  alt="user avatar"
                />
                <div className="chat-bubble__right">
                  <p className="user-name">{dbMessagedata?.name}</p>
                  <p className="user-message">{dbMessagedata?.text}
                  </p>
                  <button style={{ backgroundColor: "gray", margin: "5px" }} onClick={onSendMessage}>Send</button> <br />
                  <button style={{ backgroundColor: "gray", margin: "5px" }} onClick={getAllMessages}>getmessage</button>
                </div>
              </div>
             <LoginButton />

              authenticated</div>
             <div>
               <button style={{ backgroundColor: "gray", margin: "5px" }} onClick={getAllMessages}>getmessage</button>
              NOT authenticated</div>
        </div>
    </div>
  )
}