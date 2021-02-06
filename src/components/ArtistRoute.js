import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import FullScreenSpinner from './FullScreenSpinner';

import { fetchArtistProfile } from '../helpers/api-helpers';
import { convertNumOfFollowers } from '../utilities';
import { requestArtistInfo, receiveArtistInfo, receiveArtistInfoError } from '../actions';

const ArtistRoute = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.token);
    const currentArtist = useSelector((state) => state.artists.currentArtist && state.artists.currentArtist.profile);
    const artistImages = currentArtist && currentArtist.images;
    const artistImageUrl = artistImages && artistImages[0].url;
    const artistName = currentArtist && currentArtist.name;
    const numOfFollowers = currentArtist && currentArtist.followers.total;
    const convertedNumOfFollowers = numOfFollowers && convertNumOfFollowers(numOfFollowers);
    const artistGenres = currentArtist && currentArtist.genres;
    const firstArtistGenre = artistGenres && artistGenres.slice(0, 1);
    const secondArtistGenre = artistGenres && artistGenres.slice(1, 2);
    const { id } = useParams();
    const artistId = id;


    useEffect(() => {
        if (!accessToken) {
            return;
        }
    
        dispatch(requestArtistInfo());
        fetchArtistProfile(accessToken, artistId)
            .then((res) => {
                dispatch(receiveArtistInfo(res))
            })
            .catch((err) => {
                console.error(err);
                dispatch(receiveArtistInfoError());
            });
    }, [accessToken])


    return (
        <>
        {!accessToken &&
            <FullScreenSpinner />
        }
        {accessToken &&
        <Container>
            <Header>
                <ArtistImage src={artistImageUrl} />
                <ArtistName>{artistName}</ArtistName>
                <Followers><span>{convertedNumOfFollowers}</span> followers</Followers>
            </Header>
            <Tags>
                <Heading>tags</Heading>
                <div style={{display: 'flex'}}>
                    <Genre className='genre1'>{firstArtistGenre}</Genre>
                    <Genre>{secondArtistGenre}</Genre>
                </div>
            </Tags>
        </Container>
        }
        </>
    );
}

const Container = styled.div`
    width: 375px;
    height: 812px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0B0F14;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ArtistImage = styled.img`
    width: 175px;
    height: 175px;
    position: relative;
    top: 59px;
    border-radius: 50%;
    z-index: 0;
`;

const ArtistName = styled.h1`
    max-width: 280px;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 48px;
    line-height: 59px;
    text-shadow: 
        1px 2px 2px rgba(0, 0, 0, 0.75), 
        0px 4px 4px rgba(0, 0, 0, 0.5), 
        4px 8px 25px #000000;
    text-align: center;
    z-index: 1;
    margin: 0;
`;

const Followers = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-transform: lowercase;
    color: #FFFFFF;
    margin-top: 23px;
    
    span {
        color: #FF4FD8;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 204px;
`;

const Heading = styled.h3`
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
    color: #FFFFFF;
`;

const Genre = styled.div`
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
    text-transform: lowercase;
    color: #FFFFFF;
    padding: 8px 20px;
    background: rgba(75, 75, 75, 0.4);
    border-radius: 4px;

    &.genre1 {
        margin-right: 16px;    
    }
`;


export default ArtistRoute;

