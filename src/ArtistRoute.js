import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  requestArtistInfo,
  receiveArtistInfo,
  receiveArtistInfoError,
} from "./actions";
import styled from "styled-components";

import { fetchArtistProfile } from "./helpers/api-helpers";
import { COLORS } from "./GlobalStyles";
// import FullScreenSpinner from "./FullScreenSpinner";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const { currentArtist, status, error } = useSelector(
    (state) => state.artists
  );
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  console.log(" artistId", artistId);

  async function getArtistProfileData() {
    try {
      const data = await fetchArtistProfile(accessToken, artistId);
      if (data && data.error)
        return dispatch(receiveArtistInfoError(data.error.message));
      dispatch(receiveArtistInfo(data));
    } catch (e) {
      dispatch(receiveArtistInfoError(e));
    }
  }
  const formatNum = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(0) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(0) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(0) + "T";
  };

  useEffect(() => {
    dispatch(requestArtistInfo());
    if (!accessToken) return;

    getArtistProfileData();
  }, [accessToken]);

  return (
    <Wrapper>
      {status === "loading"}
      {status === "error" && <p>{`error: ${error}`}</p>}
      {status === "idle" && (
        <ArtistWrapper>
          <Image src={currentArtist.profile.images[0].url} alt="artistImage" />
          <Name>{currentArtist.profile.name}</Name>
          <Number>
            {formatNum(currentArtist.profile.followers.total)}{" "}
            <Span>followers</Span>
          </Number>
          <Tag>tags</Tag>
          <GenresWrapper>
            <GenresBox>{currentArtist.profile.genres[0]}</GenresBox>
            <GenresBox>{currentArtist.profile.genres[1]}</GenresBox>
          </GenresWrapper>
        </ArtistWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${COLORS.black};
`;

const ArtistWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  border: solid 1px lightgray;
  width: 100%;
  height: 100vh;
  padding: 173px 20px 20px 20px;
`;

const Image = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  min-width: 175px;
  min-height: 175px;
  margin-bottom: 25px;
  top: 59px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.p`
  margin: 0px 25px 25px 25px;
  font-size: 48px;
  font-weight: bold;
  line-height: 59px;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
  text-align: center;
  z-index: 1;
`;

const Number = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin: 0px;
  color: ${COLORS.primary};
`;

const Span = styled.span`
  color: ${COLORS.white};
`;

const Tag = styled.p`
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  margin: 204px 0 24px 0;
`;

const GenresBox = styled.div`
  padding: 8px 21px;
  background-color: ${COLORS.grayFade};
  border-radius: 4px;
  margin: 0 8px;
`;

const GenresWrapper = styled.div`
  display: flex;
`;
export default ArtistRoute;
