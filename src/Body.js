import React from 'react';
import './Body.css';
import Header from './Header.js';
import { useStateValue } from './StateProvider';
import { useSoundValue } from './SoundProvider';
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from './SongRow.js';

function Body({spotify}) {
    const [{ current_playlist, track }, dispatch] = useStateValue();
    const [{ playing, volume }, soundDispatch] = useSoundValue();

    const stopPlaying = () => {
        soundDispatch({
            type: "SET_PAUSE",
        });
    };

    const startPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
        });
        soundDispatch({
            type: "SET_VOLUME",
            volume,
        });
    };

    return (
        <div className='body'>
            <Header spotify={spotify}/>

            <div className='body__info'>
                <img src={current_playlist?.images[0].url} alt=''/>
                <div className='body__infoText'>
                    <strong>PLAYLIST</strong>
                    <h2>{current_playlist?.name}</h2>
                    <p>{current_playlist?.description}</p>
                </div>
            </div>

            <div className='body__songs'>
                <div className='body__icons'>
                    {playing ?
                        <PauseCircleFilledIcon onClick={track ? stopPlaying : null} 
                            className='body__shuffle' /> 
                    : 
                        <PlayCircleFilledIcon onClick={track ? startPlaying : null} 
                            className='body__shuffle' />
                    }
                    <FavoriteIcon fontSize='large' />
                    <MoreHorizIcon/>
                </div>
                {current_playlist?.tracks.items.map((item =>
                    <SongRow track={item.track} key={item.track.id}/>
                ))}
                <div className='body__bottom'></div>
            </div>
        </div>
    )
}

export default Body
