import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { requestArtistData, receiveArtistData, receiveArtistDataError } from "../../actions";
import styled from 'styled-components';

const ArtistRoute = () => {
    const accessToken = useSelector((state) => state.auth.token);
    //console.log(accessToken);
    const {artistId} = useParams();
    //console.log(artistId)
    const dispatch = useDispatch();
    const artistProfile = useSelector((state) => state.artists.currentArtist);
    console.log(artistProfile)

    useEffect(() => {
        if (!accessToken) {
          return;
        }
        dispatch(requestArtistData());
        fetchArtistProfile(accessToken, artistId)
          .then((data) => {
            //console.log(data)
            dispatch(receiveArtistData(data))
          })
          .catch((error) => {
            console.log(error)
            dispatch(receiveArtistDataError())
          })
      }, [accessToken]);

    if(!artistProfile) {
      return <ArtistProfile>Loading...</ArtistProfile>
    } else if(artistProfile.profile.error) {
      return <ArtistProfile>Error: {artistProfile.profile.error.message}</ArtistProfile>
    }
    const genres = artistProfile.profile.genres;
    //console.log(genres);

    const num = artistProfile.profile.followers.total;
    //console.log(num)

    const numFormatter = (num) => {
      if(num > 999 && num < 1000000){
          return (num/1000).toFixed(1) + 'K';  
      }else if(num > 1000000){
          return (num/1000000).toFixed(1) + 'M'; 
      }else if(num < 900){
          return num; 
      }
    };
    
    const followersTotal = numFormatter(num);
    console.log(followersTotal)

    return (
        <ArtistProfile>
          <Header>
            <ArtistImage src={artistProfile.profile.images[0].url} alt="Taylor" />
            <Name>{artistProfile.profile.name}</Name>
          </Header>
           <FollowersTotal><span>{followersTotal}</span> followers</FollowersTotal>
            <TagHeader>tags</TagHeader>
            <GenreBox>
              {genres.slice(0,2).map((genre) =>{
                return <Tag key={genre}>{genre}</Tag>
              })}
            </GenreBox>
        </ArtistProfile>
    )
}

const ArtistProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 200px 100px;
  background-color: #0B0F14;
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtistImage = styled.img`
  border-radius: 50%;
  width: 525px;
  height: 525px;
`;

const Name = styled.h1`
  top: 515px;
  font-size: 125px;
  position: absolute;
`;

const FollowersTotal = styled.p`
  margin-top: 125px;
  font-size: 30px;

  & span {
    color: #FF4FD8;
    font-weight: bold;
  }
`;

const TagHeader = styled.p`
  margin-top: 200px;
  font-size: 45px;
`;

const GenreBox = styled.div`
  display: flex;
`;

const Tag = styled.div`
  padding: 15px 30px;
  margin-right: 35px;
  background-color: #4B4B4B;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
`;

export default ArtistRoute;