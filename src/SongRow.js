import React, { useState } from 'react';
import './SongRow.css';
import { useStateValue } from './StateProvider.js';
import { useSoundValue } from './SoundProvider.js';

function SongRow({ track }) {
    const [{ }, dispatch] = useStateValue();
    const [{ playing, repeat, volume }, soundDispatch] = useSoundValue();

    const changeTrack = (e, track) => {
        dispatch({
            type: 'SET_TRACK',
            track: track,
        });

        let wasPlaying = playing;
        soundDispatch({
            type: 'SET_PAUSE',
        });

        let newAudio = new Audio(track.preview_url);
        newAudio.loop = repeat;
        
        soundDispatch({
            type: 'SET_AUDIO',
            audio: newAudio,
        });

        if (wasPlaying) {
            soundDispatch({
                type: 'SET_PLAYING',
            });
        }
        
        soundDispatch({
            type: "SET_VOLUME",
            volume,
        });

        document.title = `${track.name} · ${track.artists.map((artist) => artist.name).join(', ')}`
    };

    return (
        <div className='songRow' onClick={(e) => changeTrack(e, track)}>
            <img className='songRow__album' src={track.album.images[0].url} alt=''/>
            <div className='songRow__info'>
                <h1>{track.name}</h1>
                <h1>{track.preview_url ? null: "(No Preview)"}</h1>
                <p>
                    {/* joins artist names and display album name */}
                    {track.artists.map((artist) => artist.name).join(", ")}
                    {track.album.name}
                </p>
            </div>
        </div>
    )
}

export default SongRow
