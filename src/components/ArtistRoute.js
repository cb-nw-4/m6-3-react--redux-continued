import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {fetchArtistProfile, 
    fetchArtistTopTracks,
    fetchArtistRelated} from '../helpers/api-helpers';
import {useDispatch} from 'react-redux';
import {receiveArtistData, receiveArtistDataError, requestArtistData } from '../actions';
import styled from 'styled-components';
import {COLORS} from '../constants'
import PlayButton from "react-play-button";
import FullScreenSpinner from './FullScreenSpinner';


const ArtistRoute = () => {

    const dispatch = useDispatch();
   


    const  accessToken = useSelector((state) => state.auth.token);

    const {status, currentArtist} = useSelector((state) => state.artists)
    const [songPlayStatus, setPlayStatus] = useState();
    let {ArtistId} = useParams();


    console.log(songPlayStatus, 'statu')
    

    const FormatNumber = (number) =>{
        if(number >= 1e3){

            var units = ['k', 'm', 'b', 't']

             // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
            let unit = Math.floor(((number).toFixed(0).length - 1) / 3) * 3
            // Calculate the remainder
            var num = (number / ('1e'+unit)).toFixed(1)
            var unitname = units[Math.floor(unit / 3) - 1]
            
            // output number remainder + unitname
            return `${num} ${unitname}`
        }
        return number.toLocaleString()
    }

    const PlayMusic =(track) =>{
        console.log(track)
    }


    useEffect(() => {

        dispatch(requestArtistData())

        if(!accessToken){
            return;
        }

        const firstPromise = fetchArtistProfile(accessToken, ArtistId);
        const secondPromise = fetchArtistTopTracks(accessToken, ArtistId, 'CA')
        const thirdPromise = fetchArtistRelated(accessToken, ArtistId);

        Promise.all([firstPromise, secondPromise, thirdPromise])
        .then(([firstPromise, secondPromise, thirdPromise]) => {
            dispatch(receiveArtistData([firstPromise, secondPromise, thirdPromise]))
        })
        .catch((error) =>{
            console.log('error from fetch artist profile', error)
            dispatch(receiveArtistDataError())
        })
    
        
    }, [accessToken]);


    useEffect(()=>{
        if(!songPlayStatus){
            const trackObj = currentArtist && currentArtist.tracks.tracks.reduce((tracksById, track)=> {
                return {
                    ...tracksById,
                    [track.id]: {
                        id: track.id,
                        href: track.href,
                        preview_url: track.preview_url,
                        status: 'stop',
                        ...track
                    }
                }
            }, {})
            setPlayStatus(trackObj)
        }
    }, [currentArtist])

    if( status === 'loading'){
        return(
            
            <FullScreenSpinner />
        )
    } 
    else if(status ==='error'){
        return (
            <div>
                Error 
            </div>
        )
    }

    else if( status === 'idle') {

            return (<Container>
                {currentArtist && 
                <>

                <Wrapper>
                    <Img src={currentArtist.profile.images[2].url} />
                    <H2> {currentArtist.profile.name}</H2>
                </Wrapper>

                <p> 
                    <span style={{color: `${COLORS.Primary}`}}> {FormatNumber(currentArtist.profile.followers.total)}
                        </span> followers
                </p>

                <h3>top tracks</h3>

                <DivTrack>
                    {songPlayStatus && Object.values(songPlayStatus).slice(0, 3).map((track, i) => {
                        return (
                            <PlayButton
                            key={i}
                            url={track.preview_url || track.href}
                            playIconColor={COLORS.White}
                            stopIconColor={COLORS.White}
                            progressCircleColor={COLORS.Secondary}
                            progressCircleWidth= {5}
                            play={()=> setPlayStatus(track.id)}
                            stop={()=> setPlayStatus(null)}
                            active={songPlayStatus === track.id}
                            />
                        )
                    })}
            

                </DivTrack>

                <ContainerScoll>

                    <h3>Tags</h3>

                    <Ul > 
                    {currentArtist.profile.genres.map(genre => {
                        return (                    
                            <Li key={genre}>
                                    {genre}
                            </Li>
                    )})}

                    </Ul>
                </ContainerScoll>

                <ContainerScoll>

                <h3>Related artists</h3>

                    <ArtistsList > 
                    {currentArtist.related.artists.map(artist => {
                        return <ArLi key={artist.id}>
                            <Img src={artist.images[2].url} />
                            <h3>
                                {artist.name}
                            </h3>
                        
                        </ArLi>

                    })}

                    </ArtistsList>

                </ContainerScoll>


                </>
    }
                
            </Container>)
        
    }
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
`


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & img{
        margin-top: 59px;
    }
    
`

const DivTrack = styled.div`
    display: flex;
    align-self: center;
    justify-content: space-around;
`
const Img = styled.img`
    border-radius: 50%;
    overflow: hidden;
    height: 175px;
    width: 175px;
`

const H2 = styled.h2`
    font-size: 48px;
    line-height: 58.51px;
    margin-top: -60px;
`

const Ul = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Li = styled.li`
    padding: 10px 20px;
    list-style: none;
    background-color: ${COLORS.GrayFade};
    border-radius: 8px;
    margin: 10px;
    
`

const ArLi = styled.li`
    list-style: none;
    margin: 10px 0px ;
    padding: 10px;
    scroll-snap-align: start;

    & h3{
        margin-top: -30px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
    }
`

const ArtistsList = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;

    
`

const ContainerScoll = styled.div`
    overflow-x: hidden;
    width: 100%;
    text-align: center;
    margin-top: 30px;

`


export default ArtistRoute;