import React, { Component } from 'react';
import './App.css';
import HomePage from './component/homepage.component';
import { Link , Routes, Route , RouterProvider } from "react-router-dom";

const Dota = () => (
  <div>
    <h1>DOTA page</h1>
  </div>
);

const Lol = ()=> (
  <div>
    <h1>LOL page</h1>
  </div>
)

const LolLeauge = (props) => {
 // let data = this.props.match.params;
  console.log(RouterProvider)
 
 return( 
 <div>
    <h1>LOL Leauge page : </h1>
  </div>)
}

// const MyMatch = matchPath("/lol/:10", {
//   path: "/lol/:id",
//   exact: true,
//   strict: false 
// });


  function myRoutess(){
  return(
   // <BrowserRouter>
      <Routes>
        <Route path='/buyer-bay' Component={HomePage}/>
        <Route path='/buyer-bay/dota' Component={Dota}/>
        <Route path='/buyer-bay/lol' Component={LolLeauge}/>
        {/* <Route path='/buyer-bay/lol/:leaugeid' Component={LolLeauge}/>       */}
      </Routes>
      
   // </BrowserRouter>
  );
};
 function App() {
  // var path = '/';
  // var element = <HomePage/>;
  return (
    <div >
    <h1> CHOISE  <br/> its all on you</h1>
    <Link to="/buyer-bay">Home</Link> <br/>
    <Link to="/buyer-bay/dota">Dota</Link> 
    <Link to="/buyer-bay/lol">Lol</Link>
    <div>{myRoutess()}</div>
    </div>
  )
}
 export default App;

