const initialState = {
  currentArtist: null,
  status: "idle",
  error: null,
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ARTIST' : {
      return {
        ...state,
        status: 'loading'
      }
    }
    case 'RECEIVE_ARTIST' : {
      return {
        ...state,
        status: 'idle',
        currentArtist: {
          profile: action.currentArtist
        }
      }
    }
    case 'RECEIVE_ARTIST_ERROR' : {
      return {
        ...state,
        status: 'idle',
        error: true
      }
    }
    default: {
      return state;
    }
  }
}