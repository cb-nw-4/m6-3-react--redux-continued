const initialState = {
  currentArtist: null,
  status: "idle",
  };
  
  export default function artistReducer(state = initialState, action) {
    switch (action.type) {
      case 'REQUEST_ARTIST_INFO':
        return {
          ...state,
          status: "loading"
        };

      case 'RECEIVE_ARTIST_INFO':
        return {
          ...state,
          status:'idle',
          currentArtist: {
            profile :{
              ...action.info
            },
          },
        };

      default: {
        return state;
      }
    }
  }