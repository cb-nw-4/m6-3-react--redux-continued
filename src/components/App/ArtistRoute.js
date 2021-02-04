import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistProfile } from '../../helpers/api-helpers';
import {
    requestCurrentArtist,
    receiveCurrentArtist,
    receiveCurrentArtistError,
} from '../../actions';

const ArtistRoute = () =>{
    const dispatch = useDispatch();
    const [response, setResponse]=React.useState({});
    const accessToken=useSelector(state=>state.auth.token);
    const artistId=useParams();
    const getValue= async()=>{
        await fetchArtistProfile(accessToken, artistId.id)
                .then(res=>{
                    dispatch(receiveCurrentArtist(res));
                    setResponse(res)})
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
    },[accessToken])
    
    console.log(response);
    return(
        <>
        {accessToken}
        </>
    )
};

export default ArtistRoute;