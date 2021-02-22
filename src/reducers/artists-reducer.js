const initialState = {
  currentArtist: null,
  status: "loading",
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST_INFO": {
      return {
        ...state,
        status: "loading",
        error: null,
      };
    }
    case "RECEIVE_ARTIST_INFO": {
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          profile: action.artist,
        },
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_ERROR_INFO": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
