import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

const FullScreenSpinner = () => {
    return (
        <Container>
            <Loader 
                type="Audio" 
                color="#FF4FD8" 
                height={80} 
                width={80} 
            />
        </Container>
    );
}

const Container = styled.div`
    width: 375px;
    height: 812px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0B0F14;
`;


export default FullScreenSpinner;