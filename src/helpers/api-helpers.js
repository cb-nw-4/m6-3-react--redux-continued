
export function fetchArtistProfile(token, artistId) {

    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    return fetch(url, options).then((response) => response.json());
}


export function fetchArtistTopTracks(token, artistId, market){

    const options = {
        headers: { Authorization: `Bearer ${token}`},
    };

    let url =  new URL(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`) 
    
    url.search = new URLSearchParams({
        market: market
    })
    return fetch(url, options).then((response) => response.json());
}

export function fetchArtistRelated(token, artistId) {

    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

    return fetch(url, options).then((response) => response.json());
}