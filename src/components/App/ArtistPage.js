import React from "react";
import { useSelector } from "react-redux";

const ArtistPage = () => {
  const accessToken = useSelector((state) => state.auth.token);
  return <div>{accessToken}</div>;
};

export default ArtistPage;
