import React, { useEffect } from 'react';
import './App.css';
import Login from './Login.js';
import Player from './Player.js'
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from './StateProvider';

// instance of spotify api
const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();
  const id = '37i9dQZEVXbLRQDuF5jeBp';
  
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";  // clears token from url
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      
      dispatch({
        type: 'SET_PLAYLIST_ID',
        playlist_id: id,
      })
      
      spotify.getPlaylist(id).then((response) =>
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          current_playlist: response,
        })
      );

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">

      {token ? (
        <Player spotify={spotify}/>
      ) : (
        <Login />
      )}

    </div>
  );
}

export default App;
