import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ArtistRoll=({artistList})=>{
    return(
        <>
        <Label>related artists</Label>
        {artistList &&
        <Wrapper>
            {artistList.map((elem, i)=>{
                return (
                    <StyledLink to={`/artists/${elem.id}`} key={i}>
                        <Image src={elem.images[0].url}/>
                        <Name>{elem.name}</Name>
                    </StyledLink>
                )
            })}
        </Wrapper>}
        </>
    )
}

const Wrapper=styled.div`
    display:flex;
    flex-flow: row nowrap;
    scroll-snap-type: x mandatory;
    scroll-snap-type: y none;
    overflow-x:scroll;
    width:inherit;
`;

const StyledLink=styled(Link)`
    scroll-snap-align:start;
    margin:7px;
    text-decoration:none;
`;

const Image=styled.img`
    width: 100px;
    height: 100px;
    border-radius: 190.5px;
`;

const Name=styled.p`
    color:white;
    font-family: Montserrat;
    font-style: normal;
    text-align:center;
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
    margin-top:30px;

`;

export default ArtistRoll;