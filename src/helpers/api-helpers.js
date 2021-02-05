export function fetchArtistProfile(token, artistId) {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
    };
    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    return (
        fetch(url, options)
        .then((res) => res.json())
        .catch((error) => error)
    );
}