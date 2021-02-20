import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { fetchArtistProfile } from "./helpers/api-helpers";
import { useParams } from "react-router-dom";

const ArtistRoute = () =>{
    const accessToken = useSelector((state) => state.auth.token);
    const artistId = useParams({id});
    fetchArtistProfile(accessToken, artistId)
    return(
        <ArtistWrapper>
            Artist {accessToken}
        </ArtistWrapper>
    )
}

const ArtistWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100vw;
    
`;

export default ArtistRoute;