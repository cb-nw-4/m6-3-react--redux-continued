import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { requestCurrentArtist, receiveCurrentArtist, receiveArtistError} from "../../actions";
import ArtistProfile from "./ArtistProfile";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);

  const artistId = useParams();

  const dispatch = useDispatch();

  const [selectedArtist, setSelectedArtist] = useState();

  const getArtist = async () => {
    await fetchArtistProfile(accessToken, artistId.id)
      .then((res) => {
        dispatch(receiveCurrentArtist(res))
        setSelectedArtist(res)
      })
      .catch((err) => {
        receiveArtistError(err)
      })
  }

  useEffect(() => {
    requestCurrentArtist();
    if (accessToken) {
      getArtist()
    } else {
      return;
    }
  }, [accessToken])

  console.log(selectedArtist);

  if (!selectedArtist) {
    return (
      <div>Loading</div>
    )
  }
  
  if (selectedArtist) {
  return (
    <div>
      <ArtistProfile 
        image={selectedArtist.images[0].url}
        artistName={selectedArtist.name}
        followers={selectedArtist.followers.total}
        firstGenre={selectedArtist.genres[0]}
        secondGenre={selectedArtist.genres[1]}
      />
    </div>  
  )

};
}

export default ArtistRoute;
