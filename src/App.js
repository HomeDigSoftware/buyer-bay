import React, { Component } from 'react';
import './App.css';
import HomePage from './component/homepage.component';
import { createBrowserRouter, Link, Routes, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import RootLayout from './component/layout/RootLayout.component';
import './component/menu-item/menu-item.style.scss'
import LolPage from './component/Lol-Page/Lolpage.component'
import PandaScore from './component/Lol-Page/PandaScore.component';



const Dota = () => {
  return (
    <div>
      <h1>DOTA page</h1>

    </div>
  )
};



const LolLeauge = () => {
  // let data = this.props.match.params;
  console.log()

  return (
    <div>
      <h1>LOL Leauge page : </h1>
    </div>)
}
//________________________________________________________________
// const MyMatch = matchPath("/lol/:10", {
//   path: "/lol/:id",
//   exact: true,
//   strict: false 
// });

function User(props) {
  return console.log(
    props.match.params.history
  )
}


const NewRoute = createBrowserRouter(
  createRoutesFromElements(
   
    <Route path='/' element={<RootLayout />} >
      <Route index element={<HomePage />} />
      <Route path='dota' element={<Dota />} />
      <Route path='lol' element={<LolPage />} />
      <Route path='/buyer-bay/:id' Component={User} />
    </Route>,

    console.log()
    // {/* <Route path='/buyer-bay/lol/:leaugeid' Component={LolLeauge}/>       */}

  )

)
//__________________________________________________________________

//   function myRoutess(){
//   return(
//    // <BrowserRouter>
//       <Routes>
//         <Route path='/buyer-bay' Component={HomePage}/>
//         <Route path='/buyer-bay/dota' Component={Dota}/>
//         <Route path='/buyer-bay/lol' Component={LolLeauge}/>
//         {/* <Route path='/buyer-bay/lol/:leaugeid' Component={LolLeauge}/>       */}
//       </Routes>

//    // </BrowserRouter>
//   );
// };
function App() {
  // var path = '/';
  // var element = <HomePage/>;
  return (
    <div>
     
      <RouterProvider router={NewRoute} />
     
      
    </div>
    // <div >
    // <h1 className='first-h1'> CHOISE </h1>
    // <h2> its all on you</h2>
    // {/* <Link to="/buyer-bay">Home</Link> <br/>
    // <Link to="/buyer-bay/dota">Dota</Link> 
    // <Link to="/buyer-bay/lol">Lol</Link> */}
    // <div>{myRoutess()}</div>
    // {/* <RouterProvider router={myRoutess} /> */}
    // </div>
  )
}
export default App;

