import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistProfile } from '../../helpers/api-helpers';
import { requestArtistProfile, receiveArtistProfile, receiveArtistProfileError } from '../../actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const ArtistRoute = ()=>{
    const { id } = useParams(); 
    const artistId = id;
    const accessToken = useSelector((state) => state.auth.token);
    const artistStatus = useSelector((state)=> state.artists.status);
    const currentArtist = useSelector((state)=> state.artists.currentArtist);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(requestArtistProfile());
        if (!accessToken || !artistId) {
            return;
        }
        fetchArtistProfile(accessToken, artistId)
            .then((json)=> {
                dispatch(receiveArtistProfile(json));
            })
            .catch((err)=> dispatch(receiveArtistProfileError()))
    },[accessToken,artistId]);

    var SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    function abbreviateNumber(number){
        var tier = Math.log10(Math.abs(number)) / 3 | 0;
        if(tier == 0) return number;
        var suffix = SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
        var scaled = number / scale;
        return scaled.toFixed(1) + suffix;
    };

    if (!currentArtist) {
        return <CircularProgress/>;
    }

    return ( 
        <Wrapper>
            <Avatar src={currentArtist.profile.images[1].url} alt="artist avatar"/>
            <Title>{currentArtist.profile.name}</Title>
            <Followers>
                <span>
                    {abbreviateNumber(currentArtist.profile.followers.total)}
                </span> followers
            </Followers>
            <Subtitle>Tags</Subtitle>
            <Tags>
                <Tag>{currentArtist.profile.genres[0]}</Tag>
                <Tag>{currentArtist.profile.genres[1]}</Tag>
            </Tags>
        </Wrapper>
    );
};


const Wrapper = styled.div`
position: relative;
width: 375px;
height: 812px;
border: 1px solid white;
background:#0B0F14;
color:white;
display: flex;
flex-direction:column;
align-items:center;
`;

const Avatar=styled.img`
position: absolute;
width:175px;
height:175px;
top:59px;
left:104px;
border-radius:190.5px;
`;

const Title = styled.div`
z-index:5;
height: 59px;
margin-top:173px;
font-family: 'Montserrat', sans-serif;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 59px;
text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5), 4px 8px 25px #000000;
`;

const Followers = styled.div`
height: 17px;
margin-top: 25px;
font-family: 'Montserrat', sans-serif;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
& span {
    color: #FF4FD8;
};
`;

const Subtitle = styled.div`
height: 26px;
margin-top: 48px;
font-family: 'Montserrat', sans-serif;
font-style: normal;
font-weight: 600;
font-size: 21px;
line-height: 26px;
`;

const Tags = styled.div`
display:flex;
`;

const Tag = styled.div`
height: 29px;
margin-top: 10px;
margin-right:16px;
background: rgba(75, 75, 75, 0.4);
border-radius: 4px;
text-align:center;
font-family: 'Montserrat', sans-serif;
font-style: normal;
font-weight: 600;
`;



export default ArtistRoute; 