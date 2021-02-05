import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchArtistProfile, 
    makeFriendly,
    fetchRelatedArtists,
} from '../../helpers/api-helpers';
import ArtistProfile from './ArtistProfile';
import {
    requestCurrentArtist,
    receiveCurrentArtist,
    receiveCurrentArtistError,
    receiveRelatedArtists
} from '../../actions';

const ArtistRoute = () =>{
    const dispatch = useDispatch();
    // const [artists, setArtists]=React.useState();
    const accessToken=useSelector(state=>state.auth.token);
    const currentProfile=useSelector(state=>state.artists.currentArtist);
    
    const artistId=useParams();
    const getValue= async()=>{
        await fetchArtistProfile(accessToken, artistId.id)
                .then(res=>dispatch(receiveCurrentArtist(res)))
                .catch((err)=>dispatch(receiveCurrentArtistError(err)));
    }
    const relatedArtists=async()=>{
        await fetchRelatedArtists(accessToken, artistId.id)
                .then(res=>dispatch(receiveRelatedArtists(res)))
                .catch(err=>console.log(err))
    }
    useEffect(()=>{
        requestCurrentArtist();
        if(!accessToken){
            return;
        }
        else{
            getValue();
            relatedArtists();
        }
    },[accessToken, artistId]);
    const num=Math.floor(Math.random()*3);
    // if(currentProfile){
    //     console.log(currentProfile.relatedArtists.artists);
    // }
    
    return(
        <>
            {currentProfile && 
            <ArtistProfile
                imageURL={currentProfile.profile.images[num].url}
                artistName={currentProfile.profile.name}
                followers={makeFriendly(currentProfile.profile.followers.total)}
                genre={currentProfile.profile.genres}
                otherArtists={currentProfile.relatedArtists}
            />}
        </>
    )
};

export default ArtistRoute;