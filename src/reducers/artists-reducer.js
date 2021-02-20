const initialState = {
  currentArtist: null,
  status: "loading",
  error: null,
};

export default function authReducer(state = initialState, action) {
  console.log(currentArtist,"HHHHHHHHHHHHH")
  switch (action.type) {
    case "REQUEST_ARTIST":{
      return {
        ...state,
        status:"loading"
      }
    }
    case "RECEIVE_ARTIST":{
      return {
        ...state,
        status:"idle",
        currentArtist:{action.currentArtist}
      }
    }
    case "RECEIVE_ARTIST-ERROR":{
      return {
        ...state,
        status:"idle",
        error: true
      }
    }
    default: {
      return state;
    }
  }
}