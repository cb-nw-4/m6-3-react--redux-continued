export const requestAccessToken = () => {
    return {
        type: 'REQUEST_ACCESS_TOKEN',
    };
}

export const receiveAccessToken = (token) => {
    return {
        type: 'RECEIVE_ACCESS_TOKEN',
        token,
    };
}

export const receiveAccessTokenError = () => {
    return {
        type: 'RECEIVE_ACCESS_TOKEN_ERROR'
    };
}

export const requestArtistInfo = () => {
    return {
        type: 'REQUEST_ARTIST_INFO'
    };
}

export const receiveArtistInfo = (artistId) => {
    return {
        type: 'RECEIVE_ARTIST_INFO',
        artistId
    };
}

export const receiveArtistInfoError = () => {
    return {
        type: 'RECEIVE_ARTIST_INFO_ERROR'
    };
}