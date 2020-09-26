export const initialState = {
  user: null,
  playlists: [],
  playlist_id: null,
  current_playlist: null,
  playing: false,
  item: null,
  track: null,
  token: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }; 

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case 'SET_PLAYLIST_ID':
      return {
          ...state,
          playlist_id: action.playlist_id
      };

    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        current_playlist: action.current_playlist,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_TRACK":
      return {
        ...state,
        track: action.track,
      };

    default:
      return state;
  }
};

export default reducer;