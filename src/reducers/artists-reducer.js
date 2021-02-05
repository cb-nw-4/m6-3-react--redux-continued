const initialState = {
    currentArtist: null,
    status: "idle",
    error: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case "REQUEST_ARTIST_PROFILE": {
            return {
                ...state,
                status:"loading"
            };
        }
        case "RECEIVE_ARTIST_PROFILE": {
            // console.log("RECEIVE_ARTIST_PROFILE action",action);
            return {
                ...state,
                status: "idle",
                currentArtist: {
                    profile: action.data,
                }
            };
        }
        case "RECEIVE_ARTIST_PROFILE_ERROR":{
            return {
                ...state,
                status:"error"
            };
        }

        default: {
            return state;
        }
    }
};