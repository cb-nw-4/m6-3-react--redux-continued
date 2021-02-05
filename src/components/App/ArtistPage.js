import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {requestArtist, receiveArtist} from '../actions'
import {useDispatch} from 'react-redux'

const ArtistPage = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.artists.currentArtist)
  useEffect(() => {
    const getArtistProfile = async() => {
      if (accessToken) {
       dispatch(requestArtist())
       const fetching = await fetchArtistProfile(accessToken, id);
       dispatch(receiveArtist(fetching))
      } else {
        return null
      }
    }
    getArtistProfile()
  }, [accessToken]);

  if (!user) {
    return <div>loading...</div>
  } else {
    return <div>{user.profile.name}</div>;
  }
};

export default ArtistPage;
