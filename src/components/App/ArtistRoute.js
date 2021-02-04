import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
  return (
    artistMainData && (
      <Wrapper>
        <Header>
          <ProfilePicture src={artistMainData.profile.images[0].url} />
          <ProfileName> {artistMainData.profile.name}</ProfileName>
        </Header>
        <Followers>
          <NumFollower>{artistMainData.profile.followers.total}</NumFollower>
          Followers
        </Followers>
        <TagContainer>
          <TagTitle>tags</TagTitle>
          <Tags>
          <Genres >{artistMainData.profile.genres[0]}</Genres>
          <Genres >{artistMainData.profile.genres[1]}</Genres>
        </Tags>
        </TagContainer>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 812px;
  width: 375px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfilePicture = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  padding: 10px;
`;
const ProfileName = styled.h1``;
const Followers = styled.div``;
const NumFollower = styled.span`
  color: #ff4fd8;
`;
const TagContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`;
const Tags = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const TagTitle = styled.h2``;

const Genres = styled.div`
  background-color: #4b4b4b;
  margin:20px;
  border-radius:15px;
  padding:10px;
`;

export default ArtistRoute;
