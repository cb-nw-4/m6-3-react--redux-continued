import React from 'react';
import { useSelector } from "react-redux";

const ArtistRoute = () => {
    const accesstoken = useSelector((state)=> state.auth.token);

  return (
  <>
  <p>Artist route</p>
  <p>{accesstoken}</p>
  </>
  
);};



export default ArtistRoute;
