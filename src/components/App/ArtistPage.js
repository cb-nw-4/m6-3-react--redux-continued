import React from "react";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import {fetchArtistProfile} from '../../helpers/api-helpers'

const ArtistPage = () => {
  const {id} = useParams()
  const accessToken = useSelector((state) => state.auth.token);

  
  fetchArtistProfile(accessToken, id)

  return <div>{accessToken}</div>;
};

export default ArtistPage;
