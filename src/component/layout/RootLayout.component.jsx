import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './rootLayout.styles.scss'


export default function Root_Layout() {
    return (
        <div className='root-layout'>

            <header>
                <nav> <h1 className='first-h1'> CHOISE </h1>
                    <h2> its all on you</h2>
                    <div className='nav-bar'>
                        
                            <NavLink to="/buyer-bay" className='nav-bar'>Home</NavLink>
                            <NavLink to="dota" className='nav-bar'>Dota</NavLink>
                            <NavLink to="lol" className='nav-bar'>Lol</NavLink>
                        
                    </div>
                    {/* <div>{myRoutess()}</div> */}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}