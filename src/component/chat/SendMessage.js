import React, { useState } from "react";
import { auth , db } from "../../firebase.js";
import { addDoc , collection, Collection , serverTimestamp } from "firebase/firestore";
import '../../App.css'



const SendMessage = ({scroll}) => {
    const [message ,setMessage] = useState("");
    const [mess , setMess] = useState("set mess");

    const sendMessage = async (event) => {
      event.preventDefault();
      if (message.trim() === "") {
        alert("Enter valid message");
        return;
      }
      const { uid, displayName, photoURL } = auth.currentUser;
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <form onSubmit={(e) => sendMessage(e)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        
      />
      <p>{mess}</p>
      <button type="submit">Send</button>
    </form>
  );
};


 
export default SendMessage;