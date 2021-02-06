import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import { fetchArtistProfile } from "./helpers/api-helpers";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import {
  initialDataFetch,
  succesfulDataResponse,
  errorDataResponse,
} from "./actions";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const currentArtist = useSelector((state) => state.artists.currentArtist);
  const status = useSelector((state) => state.artists.status);
  let { id } = useParams();
  let artistId = id;

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    handleProfiledata();
  }, [accessToken]);

  React.useEffect(() => {
    if (status === "idle" && currentArtist !== null)
      console.log(`CurrentArtist`, currentArtist.profile);
  }, [status]);

  async function handleProfiledata() {
    dispatch(initialDataFetch());
    const data = await fetchArtistProfile(accessToken, artistId);
    if (data.external_urls) dispatch(succesfulDataResponse(data));
    else dispatch(errorDataResponse());
  }

  return (
    <Wrapper>
      <>
        {status === "idle" && currentArtist !== null ? (
          <>
            <Header>
              <Title>{currentArtist.profile.name}</Title>
              <Img1
                src={currentArtist.profile.images[0].url}
                alt="big image"
              ></Img1>

              <Followers>
                {Math.ceil(
                  Number(currentArtist.profile.followers.total) / 1000000
                )}
                M Followers
              </Followers>
            </Header>

            <TagWrapper>
              <Tag1>{currentArtist.profile.genres[0]}</Tag1>
              <Tag2> {currentArtist.profile.genres[1]}</Tag2>
            </TagWrapper>
            <RankWrapper>
              <Rank> #{currentArtist.profile.popularity}</Rank>
            </RankWrapper>
          </>
        ) : (
          <>
            {status === "error" ? (
              <Header>
                <Title>Error</Title>
              </Header>
            ) : (
              <Header>
                <Title>Loading...</Title>
              </Header>
            )}
          </>
        )}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  /* align-items: center; */
  background: black;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 215px;
  left: 54px;
  top: 59px;

  background: black;
`;

/* image 1 */
const Img1 = styled.img`
  display: flex;
  position: absolute;

  justify-content: center;
  align-items: center;
  width: 175px;

  top: 59px;
  background: url(image.png);
  border-radius: 190.5px;
`;

/* 2m Followers */
const Followers = styled.p`
  width: 93px;
  height: 17px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-transform: lowercase;

  color: #ff4fd8;
`;

const Title = styled.p`
  position: absolute;
  width: 268px;
  height: 59px;
  top: 173px;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  /* identical to box height */

  /* White */
  color: #ffffff;
  /* Triple shadow */
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;
const TagWrapper = styled.div`
  display: flex;
  position: absolute;
  margin-top: 30px;
  width: 100vw;
  justify-content: center;
  /* align-items: center; */
  background: black;
`;

const RankWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  width: 100vw;
  justify-content: center;
  /* align-items: center; */
  background: black;
`;

const Tag1 = styled.p`
  height: 26px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */
  text-transform: lowercase;
  padding: 10px;
  margin: 20px;
  /* White */
  color: #ffffff;
`;

const Tag2 = styled.p`
  height: 26px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */
  text-transform: lowercase;
  padding: 10px;
  margin: 20px;
  /* White */
  color: #ffffff;
`;

const Rank = styled.p`
  height: 26px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */
  text-transform: lowercase;
  padding: 10px;
  margin: 20px;
  /* White */
  color: #ffffff;
`;

export default ArtistRoute;
