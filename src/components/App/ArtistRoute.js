import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistprofile } from "../../helpers/api-helpers";
import {
  receiveCurrentArtist,
  requestCurrentArtist,
  receiveCurrentArtistError,
} from "../../actions";

const ArtistRoute = () => {
  const { artistId } = useParams();
  const dispatch = useDispatch();
  const [artistData, setArtistData] = useState({});
  const accessToken = useSelector((state) => state.auth.token);
  const artistMainData = useSelector((state) => state.artists.currentArtist);


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

  const roundedNum = (num) => {
    //Billions
    return Math.abs(Number(num)) >= 1.0e9
      ? (Math.abs(Number(num)) / 1.0e9).toFixed(0) + "B"
      : //Millions
      Math.abs(Number(num)) >= 1.0e6
      ? (Math.abs(Number(num)) / 1.0e6).toFixed(0) + "M"
      : //Thousands
      Math.abs(Number(num)) >= 1.0e3
      ? (Math.abs(Number(num)) / 1.0e3).toFixed(0) + "K"
      : Math.abs(Number(num));
  };
  return (
    artistMainData && (
      <Wrapper>
        <Header>
          <ProfilePicture src={artistMainData.profile.images[0].url} />
          <ProfileName>
            {" "}
            <h1>{artistMainData.profile.name}</h1>
          </ProfileName>

          <Followers>
            <NumFollower>
              {roundedNum(artistMainData.profile.followers.total)}
            </NumFollower>
            Followers
          </Followers>
        </Header>
        <TagContainer>
          <TagTitle>tags</TagTitle>
          <Tags>
            <Genres>{artistMainData.profile.genres[0]}</Genres>
            <Genres>{artistMainData.profile.genres[1]}</Genres>
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
  height: 175px;
  width: 175px;
  border-radius: 100px;
`;
const ProfileName = styled.div`
  height: 59px;
  display: flex;
  justify-content:center;
  align-items:center;
width:100%;
  top: 260px;
  position: absolute;

  z-index: 2;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;

  font-weight: bold;
`;
const Followers = styled.div`
  margin-top: 70px;
`;
const NumFollower = styled.span`
  color: #ff4fd8;
  margin: 10px;
  font-weight: bolder;
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Tags = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const TagTitle = styled.h2``;

const Genres = styled.div`
  background-color: #4b4b4b 40%;
  background: rgba(75, 75, 75, 0.4);
  margin: 20px;
  border-radius: 15px;
  padding: 10px;
`;

export default ArtistRoute;
