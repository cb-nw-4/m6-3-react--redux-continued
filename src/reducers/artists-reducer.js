const initialState = {
    currentArtist: null,
    status: "loading",
    error: null,
}

export default function artistsReducer(state = initialState, action) {
    switch(action.type) {
        default: {
            return state;
        }
    }
}