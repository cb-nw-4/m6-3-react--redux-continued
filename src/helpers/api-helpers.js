export function fetchArtistProfile(token, artistId) {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    return fetch(url, options)
            .then((response) => response.json())
            .catch(err=>console.log(err));
}

function intlFormat(num){
    return new Intl.NumberFormat().format(Math.round(num*10)/10);
}
export function makeFriendly(num){
    if(num >= 1000000)
        return intlFormat(num/1000000)+'M';
    if(num >= 1000)
        return intlFormat(num/1000)+'k';
    return intlFormat(num);
}

export function fetchRelatedArtists(token, artistId) {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

    return fetch(url, options)
            .then((response) => response.json())
            .catch(err=>console.log(err));
}