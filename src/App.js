import React, { Component } from 'react';
import './App.css';
import HomePage from './component/homepage.component';
import { Link , Routes, Route , matchPath } from "react-router-dom";

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

const LolLeauge = () => {
 // let data = this.props.match.params;
  
 
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
        <Route path='/' Component={HomePage}/>
        <Route path='/dota' Component={Dota}/>
        <Route path='/lol' Component={Lol}/>
        <Route path='/lol/:leaugeid' Component={LolLeauge}/>      
      </Routes>
      
   // </BrowserRouter>
  );
};
 function App() {
  // var path = '/';
  // var element = <HomePage/>;
  return (
    <div >
    <h1> CHOOSE  <br/> who ןs your winner</h1>
    <Link to="/dota">DOTA</Link> <br/>
    <Link to="/lol">LOL</Link>
    <div>{myRoutess()}</div>
    </div>
  )
}
 export default App;

