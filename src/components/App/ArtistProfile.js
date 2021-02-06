import React from "react";
import styled from "styled-components";

const ArtistProfile = ({ image, artistName, followers, firstGenre, secondGenre }) => {
  let roundedFollowerNumber = Math.round(followers/1000)*1000

  return (
    <Wrapper>
      <ArtistImage src={image} />
      <ArtistName>{artistName}</ArtistName>
      <FollowersContainer>
          <Followers>{roundedFollowerNumber} </Followers> followers
      </FollowersContainer>
      <Tags>tags</Tags>
      <GenreWrapper>
        <GenreContainer>
          <Genre>{firstGenre}</Genre>
        </GenreContainer>
        <GenreContainer>
          <Genre>{secondGenre}</Genre>
        </GenreContainer>
      </GenreWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div` 
  display: flex;
  flex-direction: column;
  background-color: black;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 0px 250px 0px;
`;

const ArtistImage = styled.img` 
  border-radius: 50%;
  height: 175px;
  width: 175px;
  position: fixed;
  z-index: 0;
`;

const ArtistName = styled.p` 
  font-size: 44px;
  color: white;
  font-weight: 700;
  position: relative;
  z-index: 1;
  padding-top: 80px;
  margin-bottom: 15px;
`;

const FollowersContainer = styled.div` 
  display: flex;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0px;
  padding: 0px;
`;

const Followers = styled.p` 
  font-size: 14px;
  font-weight: 600;
  color: #FF4FD8;
  margin: 0px;
  padding: 0px 5px;
`;

const Tags = styled.p` 
  color: white;
  font-size: 21px;
  font-weight: 600;
  margin-top: 70px;
`;

const GenreWrapper = styled.div` 
  display: flex;
  justify-content: space-evenly;
`;

const GenreContainer = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #4B4B4B;
  padding: 0px 10px;
  margin: 0px 10px;
`;

const Genre = styled.p` 
  font-size: 11px;
  color: white;
  font-weight: 600;
  margin: 5px;
`;

export default ArtistProfile;
