import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import {fetchArtistProfile} from "../helpers/api-helpers"
import {requestArtistInfo,receiveArtistInfo,receiveArtistError } from '../actions';
import styled from "styled-components";

const ArtistRoute = () => {
    let params = useParams();
    const accesstoken = useSelector((state)=> state.auth.token);
    const artist = useSelector((state)=>state.artists.currentArtist);
    const dispatch = useDispatch();

    const getArtistInfo = async ()=>{
        try {
            let info = await fetchArtistProfile(accesstoken,params.id);
            dispatch(receiveArtistInfo(info));
            console.log(info);
            return info;
        }catch(err){
            dispatch(receiveArtistError());
            console.error(err);
        }
    };

    const formatedFollowers=(num)=>{
        let number;

        if(num>1000000){
            number = Math.round(num/1000000);
            return number+"M";
        }else if(num>1000){
            number = Math.round(num/1000);
            return number+"k";
        }
        return num;
    };

    useEffect(()=>{
        if(!accesstoken){
            return;
        }
        dispatch(requestArtistInfo());
        getArtistInfo();
    },[accesstoken])

  return (
  <>
    {
        artist === null? null:
        <Wrapper>
            <ImgBox>
                <img src={artist.profile.images[1].url}/>
            </ImgBox>
            <div>{artist.profile.name}</div>
            <div>{formatedFollowers(artist.profile.followers.total)} followers</div>
            <div>Tags</div>
            { artist.profile.genres.map((tag)=><div key={tag}>{tag}</div>)}
        </Wrapper>
    }
  </>
  
);};

const Wrapper = styled.div`
    width:100vw;
    height:100vh;
    background-color:black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ImgBox = styled.div`

`;



export default ArtistRoute;
