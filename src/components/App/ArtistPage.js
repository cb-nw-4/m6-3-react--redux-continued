import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { requestArtist, receiveArtist } from "../actions";
import { useDispatch } from "react-redux";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleFilledWhite";

import styled from "styled-components";

const ArtistPage = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.artists.currentArtist);
  console.log(user)
  useEffect(() => {
    const getArtistProfile = async () => {
      if (accessToken) {
        dispatch(requestArtist());
        const fetching = await fetchArtistProfile(accessToken, id);
        dispatch(receiveArtist(fetching));
      } else {
        return null;
      }
    };
    getArtistProfile();
  }, [accessToken]);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <ArtistContainer>
      <NameImageFollowers>
        <img
          style={{
            borderRadius: "50%",
            width: "50%",
            height: "200px",
            position: "relative",
          }}
          src={user.profile.images[2].url}
        ></img>
        <ArtistTitle> {user.profile.name}</ArtistTitle>
        <div>
          <span style={{ color: "#FF4FD8" }}>
            {user.profile.followers.total}
          </span>{" "}
          followers
        </div>
      </NameImageFollowers>
      <TopTracks>
        <div style={{ fontSize: "1.4rem" }}>top tracks</div>
        <div>
          <PlayCircleOutlineIcon fontSize="large" />
          <PlayCircleOutlineIcon fontSize="large" />
          <PlayCircleOutlineIcon fontSize="large" />
        </div>
      </TopTracks>
      <Tags>
        <div > Tags</div>
        <SwagContainer>
          <SwagButton>{user.profile.genres[0]}</SwagButton>
          <SwagButton>{user.profile.genres[1]}</SwagButton>
        </SwagContainer>
      </Tags>
      <RelatedArtistContainer>
        <RelatedArtist>
          related artists
        </RelatedArtist>
      </RelatedArtistContainer>
    </ArtistContainer>
  );
};

const RelatedArtist = styled.div`
  text-align: center;
  font-size: 21px;
  font-weight: 600;
`;

const RelatedArtistContainer = styled.div`

`;

const SwagContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SwagButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: rgba(75, 75, 75, 0.4);
  font-size: 0.8rem;
  border-radius: 4px;
  border: none;
  color: white;
  margin: 14px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTracks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtistTitle = styled.div`
  position: relative;
  bottom: 70px;
  font-size: 2.2rem;
  font-weight: bold;
`;

const NameImageFollowers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ArtistContainer = styled.div`
  background-color: black;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: space-evenly;
  
`;

export default ArtistPage;
