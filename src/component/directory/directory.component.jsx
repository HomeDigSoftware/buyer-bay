import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.style.scss'
class Dirctrory extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            section : [{
            title: 'LOL',
            imageUrl: 'https://hardwaresfera.com/wp-content/uploads/2019/07/league-of-legends-lol.jpg',
            id: 1,
            size: 'small',
            linkUrl: 'see all'
          },
          {
            title: 'DOTA 2',
            // imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
            imageUrl : 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg',
            id: 2,
            size: 'small',
            linkUrl: 'see all'
          },
          {
            title: 'CS : GO',
            imageUrl: 'https://blog.r10.net/storage/uploads/post/2023/03/1280/720/csgo-2-oyunu-nihayet-cikiyor.jpg',
            id: 3,
            size: 'small',
            linkUrl: 'see all'
          },
          {
            title: 'PUBG',
            imageUrl: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202009/pubg_game_660_030920014826.jpg?size=1200:675',
            size: 'large',
            id: 4,
            linkUrl: 'see all'
          },
          {
            title: 'FIFA',
            imageUrl: 'https://images.indianexpress.com/2022/09/FIFA-23.jpg',
            size: 'large',
            id: 5,
            linkUrl: 'see all'
          }]
        }
    };
    render(){
    return(
  
      <div className='directory-menu'>
       {
        this.state.section.map(({title, imageUrl, id , size}) => (
           <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/> 
        ))}
      </div>
  
    )}
};
export default Dirctrory;