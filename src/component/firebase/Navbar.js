import React, { useState } from "react";
 //import GoogleSignin from "../../btn_google_signin_dark_pressed_web.png";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import '../../App.css'

const NavBar = () => {
//   const [user, setUser] = useState(false);
const [user] = useAuthState(auth);


const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth , provider);
  };
  const signOut = () => {
    auth.signOut();
  };
  return (
    <nav className="nav-bar-my">
      {/* <h1>React Chat</h1> */}
      {user ? (
        <button onClick={signOut} className="sign-out-my" type="button">
          Sign Out
        </button>
      ) : (
  // this is the login with google button      
        // <button className="sign-in">
        //   <img
        //     onClick={googleSignIn}
        //     src={GoogleSignin}
        //     alt="sign in with google"
        //     type="button"
        //   />
        // </button>
        <div></div>
      )}
    </nav>
  );
};
export default NavBar;