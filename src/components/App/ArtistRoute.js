import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistprofile } from "../../helpers/api-helpers";
import {
  receiveCurrentArtist,
  requestCurrentArtist,
  receiveCurrentArtistError,
} from "../../actions";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const [artistData, setArtistData] = useState({});
  const accessToken = useSelector((state) => state.auth.token);
  const artistMainData = useSelector((state) => state.artists.currentArtist);
  const artistId = "1YZEoYFXx4AxVv13OiOPvZ";

  useEffect(() => {
    dispatch(requestCurrentArtist());
    if (!accessToken) {
      return;
    }

    const mainData = async () => {
      try {
        let fetched = await fetchArtistprofile(accessToken, artistId);

        dispatch(receiveCurrentArtist(fetched));
        
      } catch {
        console.error("error404");
      }
    };
    mainData();
  }, [accessToken]);

  console.log(artistMainData);


    console.log(artistData);
  return artistMainData && <Wrapper>
      <Header>
          <ProfilePicture src={artistMainData.profile.images[0].url} />
          <ProfileName> {artistMainData.profile.name}</ProfileName> 
       </Header>
       <Followers>{artistMainData.profile.followers.total}</Followers>
       <Genres>{artistMainData.profile.genres.map((genre)=> {
           return <div>{genre}</div>
       })}</Genres>
       </Wrapper>;
};


const Wrapper = styled.div``;
const Header =styled.div`
display:flex;
flex-direction:column;
`;
const Followers = styled.div``;
const Genres = styled.div``;
const ProfilePicture = styled.img`
height: 200px;
width: 200px;
border-radius: 1000px;
`;
const ProfileName = styled.h1``;
export default ArtistRoute;
