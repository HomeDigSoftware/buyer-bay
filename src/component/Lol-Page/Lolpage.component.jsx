import React from 'react';
import './Lolpage.styles.scss'
//import Options from './PandaScore.component';


class Lol extends React.Component  {
    // constructor(props){
    //     super(props)
    // }
    render(){
    return (
        <div>
            <h1>LOL page</h1>
            {/* <Options /> */}
            <div className='lol-main'>
                {/* < img src='https://i.insider.com/619ed13c1ca5280018113cf9?width=1136&format=jpeg' alt='' ></img> */}
             <div className='team-one'>
                team 1      
            </div>
            <div className='team-two'>
                team 2     
            </div>
            <div className='panda'>
               panda    
            </div>
            </div>
        </div>
    )
}
}
export default Lol;