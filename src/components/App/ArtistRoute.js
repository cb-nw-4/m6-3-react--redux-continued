import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchArtistProfile} from '../../helpers/api-helpers.js';
import {requestArtistProfile, receiveArtistProfile, receiveArtistProfileError} from '../../actions.js';
import styled from "styled-components";

// package for formatting the follower count
import numeral from 'numeral';

const ArtistRoute = () => {
    const accessToken = useSelector((state) => state.auth.token);
    const { id } = useParams();
    // returns an object: Object { id: "3WrFJ7ztbogyGnTHbHJFl2" }
    const dispatch = useDispatch();
    const status = useSelector((state) => state.artists.status);
    const currentArtist = useSelector((state) => state.artists.currentArtist);

    useEffect(() => {
        dispatch(requestArtistProfile())
        let artistProfileFunction = async () => {
            if (!accessToken) {
                return;
            } else if (accessToken && status === 'loading') {
                let response = await fetchArtistProfile(accessToken, id);
                response === 'error' ? dispatch(receiveArtistProfileError()) : dispatch(receiveArtistProfile(response));
            }
        }
            artistProfileFunction();
        }, [accessToken]);

    return (
        <>
            {!currentArtist
            ? <h1>Loading Artist Information...</h1>
            : 
                <ArtistContainer>
                    <ArtistImage src={currentArtist.profile.images[0].url} alt="artist" />
                    <h1>{currentArtist.profile.name}</h1>
                    <p><FollowerCount>{numeral(currentArtist.profile.followers.total).format('0.0a')}</FollowerCount> followers</p>
                    <h1>Tags</h1>
                    <p>{currentArtist.profile.genres[0]}</p>
                    <p>{currentArtist.profile.genres[1]}</p>
                </ArtistContainer>
            }
        </>
    )
}

export default ArtistRoute;

const ArtistContainer = styled.div`
    width: 50%;
    height: 50%;
    position: relative;
    left: 10px;
    top: 10px;
`;

const ArtistImage = styled.img`
    height: 400px;
    width: 300px;
`;

const FollowerCount = styled.span`
    font-weight: bold;
`;