import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import {
  requestArtistProfile,
  receiveArtistProfile,
  receiveArtistProfileError
} from '../actions';
import { fetchArtistProfile } from '../helpers/api-helpers';
import { numFormat } from '../utils';

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const artists = useSelector((state) => state.artists);
  const artistId = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    dispatch(requestArtistProfile());

    (async() => {
      const currentArtist = await fetchArtistProfile(accessToken, artistId);
      
      if (!currentArtist.hasOwnProperty('error')) {
        dispatch(receiveArtistProfile(currentArtist));
      } else {
        dispatch(receiveArtistProfileError());
      }
    })()
  }, [accessToken]);

  if (artists.status === 'loading') {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  } else if (artists.status === 'idle') {
    const tags = artists.currentArtist.genres.slice(0, 2);

    return (  
      <Wrapper>
        <ArtistImg image={artists.currentArtist.images[0].url} />
        <ArtistName>
          {artists.currentArtist.name}
        </ArtistName>
        <Followers>
          <NumFollowers>{numFormat(artists.currentArtist.followers.total)}</NumFollowers> followers
        </Followers>
        <TagsTitle>tags</TagsTitle>
        <TagContainer>
          {tags.map(tag => <Tag key={uuidv4()}>{tag}</Tag>)}
        </TagContainer>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <h1>An error occured getting the artist</h1>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: 100hw;
  padding-top: 50px;
  text-align: center;
  color: white;
  background-color: black;
`;

const ArtistImg = styled.div`
  height: 200px;
  width: 200px;
  margin: auto;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
`;

const ArtistName = styled.div`
  text-align: center;
  position: relative;
  top: -50px;
  font-size: 3rem;
  font-weight: 600;
  background-color: transparent;
`;

const Followers = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const NumFollowers = styled.span`
  color: #ff4ed8;
  font-weight: bold;
`;

const TagsTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 100px;
`;

const TagContainer = styled.div`
  width: 80%;
  display: inline-flex;
  justify-content: space-evenly;
  padding-top: 30px;
`;

const Tag = styled.div`
  padding: 5px 10px;
  font-weight: 600;
  border-radius: 5px;
  background-color: #25282a;
`;

export default ArtistRoute;
