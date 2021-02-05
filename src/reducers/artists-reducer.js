const initialeState = {
    currentArtist : null,
    status: 'idle',
    error: null
}

export default function artistsReducer(state= initialeState, action){
    switch(action.type){

        case "REQUEST_ARTIST_DATA": {
            return {
                ...state,
                status: 'loading'
            }
        }
        case "RECEIVE_ARTIST_DATA":{
            return {
                ...state,
                status: 'idle',

                currentArtist: {
                    ...state.currentArtist,
                    profile: action.data[0],
                    tracks: action.data[1],
                    related: action.data[2]
                }
                
            }
        }

        case "RECEIVE_ARTIST_DATA_ERROR": {
            return{
                ...state,
                status: 'error',
            }
        }
        default:{
            return state;
        }
    }
}