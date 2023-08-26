import React from 'react';
import './homepage.styles.scss'
import Dirctrory from './directory/directory.component';
// import logo from '../../logo/png/logo-no-background.png'
import logo from '../logo-no-background.png'
const HomePage =() =>(

    <div className='homepage'>
      <img className='logo' src={logo} alt='logo'/>
      <Dirctrory />
    </div>

);
export default HomePage