import React from "react";
import GoogleSignin from "../../Google-images/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import '../../App.css'
import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import { getMessages } from "../../services/apiMessages"; 

const Welcome = () => {
  const [countries, setCountries] = useState([]);
  
  useEffect(function(){
    getMessages().then((data , i) => console.log(data[0].message));
  }, [])

  // useEffect(() => {
  //   getCountries();
  // }, []);

  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   setCountries(data);
  // }


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    console.log("clickingggggggg")
    
  };

 
  
  const supaBaseSingIn = () => {
    
    // supabase.auth.singIn({provider : 'google'})
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
        // console.log('Supabase Instance: ', supabase)
  }
  
  return (
    <main className="welcome">
      <h2>Find a rival </h2>
      {/* <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} /> */}
      <p>Sign in with Google </p>
      <button className="sign-in"  >
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
          
        />
      </button>
      <ul>
      <p>get message</p>
      <button className="sign-in"  >
        <img
          onClick={supaBaseSingIn}
          src=""
          alt="sign in with google"
          type="button"
          
        />
      </button>
      </ul>
    </main>
  );
};

export default Welcome;