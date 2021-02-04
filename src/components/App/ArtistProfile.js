import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';

const ArtistProfile=({
    imageURL,
    artistName,
    followers,
    genre,
}) => {
    console.log(genre);
    return(
        <Wrapper>
            <Header>
                <Image src={imageURL}/>
                <Name>{artistName}</Name>
                <Followers>{followers} followers</Followers>
            </Header>
            <Tracks>
                <Label>
                    top tracks
                </Label>
            </Tracks>
            <Tags id="tags">
                <Label>
                    tags
                </Label>
                {genre.map(elem=>{
                    return (
                        <Genre>{elem}</Genre>
                    )
                })}
            </Tags>
        </Wrapper>
    )
};

const Wrapper=styled.div`
    width: 375px;
    height: 812px;
    background: #0B0F14;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header=styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image=styled.img`
    width: 178px;
    height: 188px;
    margin-top:20px;
    border-radius: 190.5px;
`;

const Name=styled.p`
    width: 268px;
    height: 59px;
    font-family: Montserrat;
    font-style: normal;
    font-weight:bold;
    font-size: 48px;
    line-height: 59px;
    color: #FFFFFF;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5), 4px 8px 25px #000000;
    margin-block-start: 0.4em;
    margin-block-end: 0.4em;
    margin-inline-start: 0px
`;

const Followers=styled.p`
    height: 17px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-transform: lowercase;
    text-align:center;
    color:white;
`;

const Tracks=styled.section`
    width: 174px;
    height: 92px;
`;

const Label=styled.p`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
    text-transform: lowercase;
    color: #FFFFFF;
    transform: rotate(0.08deg);
    text-align:center;
`;

const Tags=styled.section`
    height:auto;
    width:auto;
`;

const Genre=styled.span`
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    padding:10px;
    color:white;
    background: rgba(75, 75, 75, 0.4);
    border-radius: 4px;
    text-align:center;
    margin:5px;
`;

export default ArtistProfile;