import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { useSoundValue } from "./SoundProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";

function Footer() {
    const [{ current_playlist, track }, dispatch] = useStateValue();
    const [{ audio, playing, volume, repeat, shuffle }, soundDispatch] = useSoundValue();

    const setShuffle = () => {
        if (!shuffle && repeat) {
            setRepeat();
        }
        soundDispatch({
            type: "SET_SHUFFLE",
            shuffle: !shuffle,
        });
    };

    const stopPlaying = () => {
        soundDispatch({
            type: "SET_PAUSE",
        });
    };

    const startPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
        });
    };

    const setRepeat = () => {
        if (!repeat && shuffle){
            setShuffle();
        }
        soundDispatch({
            type: "SET_REPEAT",
            repeat: !repeat,
        })
    }

    const restart = () => {
        soundDispatch({
            type: 'SET_RESTART',
        })
    }

    const handleChange = (e, value) => {
        soundDispatch({
            type: "SET_VOLUME",
            volume: value / 100,
        });
    }

    // Next Track
    const nextTrack = () => {
        console.log("Next Song ---->")
        if (repeat) {
            restart();
        }
        else if (shuffle) {
            rndTrack();
        }
        else {
            let i = 0;
            let newTrack;

            let max = current_playlist.tracks.items.length;

            // find current track
            while (i < max){
                newTrack = current_playlist.tracks.items[i].track;

                if(track == newTrack){
                    i += 1;

                    if (i == max){
                        i = 0;
                    }

                    newSong(i);
                    break
                }

                i += 1;

                if (i == max) {
                    dispatch({
                        type: 'SET_TRACK',
                        track: null,
                    });

                    soundDispatch({
                        type: 'SET_PAUSE',
                    });

                    soundDispatch({
                        type: 'SET_AUDIO',
                        audio: null,
                    });
                }
            }
        }
    }

    const rndTrack = () => {
        while(true) {
            let randomTrackNumber = Math.floor((Math.random() * current_playlist.tracks.items.length));
            let randomTrack = current_playlist.tracks.items[randomTrackNumber].track;

            if(track !== randomTrack){
                newSong(randomTrackNumber);
                break
            }
        }
    }

    const newSong = (i) => {
        let newTrack = current_playlist.tracks.items[i].track;

        dispatch({
            type: 'SET_TRACK',
            track: newTrack,
        });
            
        let wasPlaying = playing;
        soundDispatch({
            type: 'SET_PAUSE',
        });

        let newAudio = new Audio(newTrack.preview_url);
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
    }

    if (audio) {
        // After audio ends
        audio.onended = () => {
            nextTrack();
        }
    }
    
    return (
        <div className="footer">
            <div className="footer__left">
                <img
                className="footer__albumLogo"
                src={track?.album.images[0].url}
                alt={track?.name}
                />
                {track ? (
                    <div className="footer__songInfo">
                        <h4>{track.preview_url ? track.name: "(No Preview)"}</h4>
                        <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                    ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>
                            
            <div className="footer__center">
                <ShuffleIcon onClick={track ? setShuffle : null} className={shuffle ? "footer__green" : "footer__icon"}/>
                <SkipPreviousIcon onClick={track ? restart : null} className="footer__icon" />
                {playing ? (
                    <PauseCircleOutlineIcon onClick={track ? stopPlaying : null}
                        fontSize="large"
                        className="footer__icon"
                    />
                    ) : (
                    <PlayCircleOutlineIcon onClick={track ? startPlaying : null}
                        fontSize="large"
                        className="footer__icon"
                    />
                )}
                <SkipNextIcon onClick={track ? nextTrack : null} className="footer__icon" />
                <RepeatIcon onClick={track ? setRepeat : null}
                    className={repeat ? "footer__green" : "footer__icon"}/>
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <div className='footer__rightIcons'>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    </div>
                    <div className='footer__rightIcons'>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    </div>
                    <Grid item xs>
                        <Slider 
                            defaultValue={50}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="off"
                            onChange={handleChange}
                            min={0}
                            max={100}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
        );
    }

export default Footer;