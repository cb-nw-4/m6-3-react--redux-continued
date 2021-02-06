export const requestAccessToken = () => ({
    type: "REQUEST_ACCESS_TOKEN",
  });
  
  export const receiveAccessToken = (token) => ({
    type: "RECEIVE_ACCESS_TOKEN",
    token,
  });
  
  export const receiveAccessTokenError = () => ({
    type: "RECEIVE_ACCESS_TOKEN_ERROR",
  });

  //ARTIST
  export const requestArtistInfo = () => ({
      type: 'REQUEST_ARTIST_INFO',
  });

  export const receiveArtistInfo = (info) => ({
    type: 'RECEIVE_ARTIST_INFO',
    info,
});

export const receiveArtistError = () => ({
    type: 'RECEIVE_ARTIST_ERROR',
});