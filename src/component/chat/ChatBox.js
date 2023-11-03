import React , { useEffect , useRef , useState } from "react";
import {query , collection, orderBy, onSnapshot, limit, QuerySnapshot} from "firebase/firestore"
import { db } from "../../firebase.js";
import Message from "./Message.js";
import SendMessage from "./SendMessage.js";
import '../../App.css'


const ChatBox = () => {
  const [messages , setMessages] = useState([]);
  const scroll = useRef();

  useEffect(()=> {
    const q = query(
      collection(db , "messages") , 
      orderBy("createdAt" , "asc"),
      limit(50)
    );

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const fatchedMessage = [];
        QuerySnapshot.forEach((doc) => {
          fatchedMessage.push({...doc.data() , id: doc.id});
        });
        const sortMessages = fatchedMessage.sort(
          (a,b) => a.createdAt
        );
        setMessages(sortMessages);
      });
        return () => unsubscribe
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message}/>
        ))}
      </div>
      <span ref={scroll}></span>
      {/* <SendMessage scroll={scroll} /> */}
    </main>
  );
};

export default ChatBox;