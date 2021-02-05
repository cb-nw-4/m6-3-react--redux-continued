export const requestAccessToken=()=>({
    type:"REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken=(token)=>({
    type: "RECEIVE_ACCESS_TOKEN",
    token,
});

export const receiveAccessTokenError=()=>({
    type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestCurrentArtist=()=>({
    type:"REQUEST_CURRENT_ARTIST",
});

export const receiveCurrentArtist=(profile)=>({
    type: "RECEIVE_CURRENT_ARTIST",
    profile,
});

export const receiveCurrentArtistError=(error)=>({
    type: "RECEIVE_CURRENT_ARTIST_ERROR",
    error,
});

export const receiveRelatedArtists=(artists)=>({
    type: "RECEIVE_RELATED_ARTISTS",
    artists,
});