import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ArtistRoute = () =>{
    const accessToken=useSelector(state=>state.auth.token);
    // console.log(accessToken);
    return(
        <>
        {accessToken}
        </>
    )
};

export default ArtistRoute;