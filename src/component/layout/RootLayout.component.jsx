import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./rootLayout.styles.scss";
import pandaAPI from "../Lol-Page/PandaScore.component";
import PandaScore from "../Lol-Page/PandaScore.component";

export default function Root_Layout() {
  // console.log(pandaAPI.response)
  return (
    <div className="root-layout">
      <header className="bg-gray-500 ">
        <nav className=" text-zinc-200">
          
          <h1 className="text-6xl text-center font-extrabold underline text-blue-500 ">
            
            CHOISE  
          </h1>
          <h2 className=" uppercase bg-zinc-600 text-3xl text-center text-zinc-300"> its all on you</h2>
            <div className="flex flex-wrap border-4 border-indigo-400 bg-zinc-600 m-2  hover:bg-sky-900 rounded-xl text-zinc-400 text-3xl">
          {/* <div className=" bg-zinc-700 text-zinc-200 group-hover:bg-sky-400 " > */}
            <NavLink to="/" className="  ml-3 mr-4 text-zinc-400 text-3xl text">
              Home
            </NavLink>
            <NavLink to="dota" className=" ">
              Dota
            </NavLink>
            
            <NavLink to="lol" className="ml-4 text-zinc-400 text-3xl">
              Lol
            </NavLink>
          {/* </div>{" "} */}
            </div>
          <PandaScore />
          {/* <div>{myRoutess()}</div> */}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
