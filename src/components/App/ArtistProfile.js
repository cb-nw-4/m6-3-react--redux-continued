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
  height: 100%;
  padding: 50px 0px 200px 0px;
`;

const ArtistImage = styled.img` 
  border-radius: 50%;
  height: 200px;
  width: 200px;
`;

const ArtistName = styled.p` 
  font-size: 40px;
  color: white;
  font-weight: 800;
`;

const FollowersContainer = styled.div` 
  display: flex;
  font-size: 18px;
  color: white;
  margin: 0px;
  padding: 0px;
`;

const Followers = styled.p` 
  font-size: 18px;
  color: fuchsia;
  margin: 0px;
  padding: 0px 5px;
`;

const Tags = styled.p` 
  color: white;
  font-weight: 600;
  margin: 50px 0px 10px 0px;
`;

const GenreWrapper = styled.div` 
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0px;
`;

const GenreContainer = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: darkgray;
  border: 1px solid blue;
  padding: 0px 10px;
  margin: 0px 10px;
`;

const Genre = styled.p` 
  font-size: 16px;
  color: white;
  font-weight: 800;
  margin: 5px;
`;

export default ArtistProfile;
