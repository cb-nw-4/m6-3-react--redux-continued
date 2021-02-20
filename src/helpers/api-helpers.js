export async function getArtistProfileData(){
    const data = await fetchArtistProfile(token, artistId)
    setArtistProfile(data)
    const option = {
        headers:
        {
            Authorization: `Bearer ${token}`,
        }
    };
    const url = `https://api.spotify.com/v1/artists/${artistId}`;
    return (
        fetch(url, option)
        .then((response) => response.json())
    )
}
