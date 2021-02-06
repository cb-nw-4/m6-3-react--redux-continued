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
                <Img src={artist.profile.images[0].url}/>
            </ImgBox>
            <Name>{artist.profile.name}</Name>
            <Followers><Num>{formatedFollowers(artist.profile.followers.total)}</Num> followers</Followers>
            <TagSection>
                <TagTitle>tags</TagTitle>
                { artist.profile.genres.map((tag)=><Tag key={tag}>{tag}</Tag>)}
            </TagSection>
            
        </Wrapper>
    }
  </>
  
);};
const Tag=styled.div`
    font-size:11px;
    background-color:rgba(75, 75, 75, 0.4);
    border-radius: 4px;
    padding: 6px 16px;
    margin: 10px;
    `;
const TagTitle=styled.div`
    font-weight:600;
    font-size:21px;
    line-height:26px;
`;
const TagSection=styled.div`
    position: absolute;
    top:478px;
    display: flex;
    flex-direction: column;
    align-items:center;
    width:100%;
`;
const Num=styled.div`
    color:#FF4FD8;
    margin-right: 5px;
    font-weight:600;
`;
const Followers=styled.div`
    position:absolute;
    top:257px;
    display: flex;
    flex-direction: row;
`;
const Name = styled.div`
    font-weight:600;
    font-size:48px;
    position: absolute;
    top:173px;
    line-height:58.51px;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5), 4px 8px 25px #000000;
`;
const Wrapper = styled.div`
    width:100vw;
    height:100vh;
    background-color:#0B0F14;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ImgBox = styled.div`
    width: 175px;
    height: 175px;
    top: 59px;
    position: absolute;
    overflow: hidden;
    border-radius: 190.5px;
    justify-content: center;
    display: flex;
    align-items: center;
`;
const Img = styled.img`
    width: 100%;
`;



export default ArtistRoute;
