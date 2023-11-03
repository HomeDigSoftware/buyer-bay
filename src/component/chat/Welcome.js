import React from "react";
import GoogleSignin from "../../Google-images/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import '../../App.css'
import { useEffect, useState } from "react";
import supabase from "../../services/supabase.js";
import { getMessages } from "../../services/apiMessages.js";
import { Auth , AuthCard, MagicLink, SignIn, ThemeSupa } from "@supabase/auth-ui-react";

const Welcome = () => {
  const [countries, setCountries] = useState([]);
  const [theData, setTheData] = useState();
 
  useEffect(function () {
  
  async function check_user(){
     
      const { data: { user } } = await supabase.auth.getUser()

      if (user !== null) 
      { 
        console.log(user.aud)
        setTheData(user)
        getMessages().then((data, i) => console.log(data[0].message));
      }
      else
      {

      }

  }
  check_user();
  }, [])

  async function insertSupaBase() {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        { message: 'testing insert to supabase' },
      ])
      .select()
  }



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
     
    </main>
  );
};

export default Welcome;