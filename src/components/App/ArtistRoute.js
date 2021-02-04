import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistprofile } from "../../helpers/api-helpers";

const ArtistRoute = () => {
    const dispatch = useDispatch();
  const [artistData, setArtistData] = useState([]);
  const accessToken = useSelector((state) => state.auth.token);

  const artistId = "1YZEoYFXx4AxVv13OiOPvZ";

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const mainData = fetchArtistprofile(accessToken, artistId);
    setArtistData(mainData);
    console.log(mainData.value)
  }, [accessToken]);

  console.log(artistData);

  return (
    artistData &&  (
      <div>
          {artistData.name}
        {/* {artistData.map((data) => {
          return <div>{data.name}</div>;
        })} */}
        Hi
      </div>
    )
  );
};

export default ArtistRoute;
