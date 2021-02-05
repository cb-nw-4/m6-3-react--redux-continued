const initialState = {
  currentArtist: null,
  status: 'loading',
  error: null
};

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ARTIST_PROFILE': {
      return {
        ...state,
        status: 'loading'
      }
    }

    case 'RECEIVE_ARTIST_PROFILE': {
      return {
        ...state,
        currentArtist: action.currentArtist,
        status: 'idle'
      }
    }

    case 'RECEIVE_ARTIST_PROFILE_ERROR': {
      return {
        ...state,
        status: 'error'
      }
    }
    
    default: {
      return state;
    }
  }
};

export default artistsReducer;
