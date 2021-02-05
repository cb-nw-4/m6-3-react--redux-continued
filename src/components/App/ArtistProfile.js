import React from 'react';
import styled from 'styled-components';
import ArtistRoll from './ArtistRoll';

const ArtistProfile=({
    imageURL,
    artistName,
    followers,
    genre,
    otherArtists,
}) => {
    // console.log(otherArtists);
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
            <Label>
                tags
            </Label>
            <Tags id="tags">
                {genre.map((elem, i)=>{
                    return (
                        <Genre key={i}>{elem}</Genre>
                    )
                })}
            </Tags>
            {otherArtists && 
                <ArtistRoll artistList={otherArtists.artists}/>
            }
        </Wrapper>
    )
};

const Wrapper=styled.div`
    width: 375px;
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
    font-family: Montserrat;
    font-style: normal;
    font-weight:bold;
    font-size: 48px;
    line-height: 59px;
    color: #FFFFFF;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5), 4px 8px 25px #000000;
    margin-block-start: 0.4em;
    margin-block-end: 0.4em;
    margin-inline-start: 0px;
    text-align:center;
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
    text-align:center;

`;

const Tags=styled.section`
    height:auto;
    width:auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content:center;
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