import React, { useState } from 'react';
import './SidebarOption.css';
import { useStateValue } from './StateProvider';

function SidebarOption({ spotify, title, id, Icon }) {
    const [{}, dispatch] = useStateValue();
    const [{ shuffle }, soundDispatch] = useSoundValue();

    const changePlaylist = (id, e) => {
        dispatch({
            type: 'SET_PLAYLIST_ID',
            id: id,
        });

        spotify.getPlaylist(id).then((response) => {
            dispatch({
              type: "SET_CURRENT_PLAYLIST",
              current_playlist: response,
            });
        });

        soundDispatch({
          type: "SET_SHUFFLE",
          shuffle: false,
      });
    }

    return (
        <div className='sidebarOption'>
            <div className='sidebarOption__top'>
            {Icon && <Icon className='sidebarOption__icon'/>}</div>
          {Icon ? 
            <div onClick={(e) => changePlaylist(id, e)} className='sidebarOption__top'><h4>{title}</h4></div>: 
            <div className='sidebarOption__playlist'><p onClick={(e) => changePlaylist(id, e)}>{title}</p></div>
          }
        </div>
    )
}

export default SidebarOption;
