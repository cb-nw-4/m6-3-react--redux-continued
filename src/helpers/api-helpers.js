// import { useDispatch } from "react-redux";
// import {
//     receiveCurrentArtist,
//     requestCurrentArtist,
//     receiveCurrentArtistError,
//   } from "../actions";
export function fetchArtistprofile(token, artistId) {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const url = `https://api.spotify.com/v1/artists/${artistId}`;
  return fetch(url, options).then((response) => response.json());
}
