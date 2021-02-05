import React from 'react';
import { useSelector } from 'react-redux';


const ArtistRoute = ()=>{
    const accesToken = useSelector((state)=>state.auth.token);
    return(
        <>
        {accesToken}
        </>
    )
};

export default ArtistRoute;