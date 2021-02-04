import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistProfile, makeFriendly } from '../../helpers/api-helpers';
import ArtistProfile from './ArtistProfile';
import {
    requestCurrentArtist,
    receiveCurrentArtist,
    receiveCurrentArtistError,
} from '../../actions';

const ArtistRoute = () =>{
    const dispatch = useDispatch();
    const accessToken=useSelector(state=>state.auth.token);
    const currentProfile=useSelector(state=>state.artists.currentArtist);
    const artistId=useParams();
    const getValue= async()=>{
        await fetchArtistProfile(accessToken, artistId.id)
                .then(res=>dispatch(receiveCurrentArtist(res)))
                .catch((err)=>dispatch(receiveCurrentArtistError(err)));
    }
    useEffect(()=>{
        requestCurrentArtist();
        if(!accessToken){
            return;
        }
        else{
            getValue();
        }
    },[accessToken, artistId]);
    const num=Math.floor(Math.random()*3);
    if(currentProfile){
        console.log(currentProfile.profile);
    }
    
    
    return(
        <>
            {currentProfile && 
            <ArtistProfile
                imageURL={currentProfile.profile.images[num].url}
                artistName={currentProfile.profile.name}
                followers={makeFriendly(currentProfile.profile.followers.total)}
                genre={currentProfile.profile.genres}
            />}
        </>
    )
};

export default ArtistRoute;