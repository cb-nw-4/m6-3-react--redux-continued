import React from 'react';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import { COLORS } from "./GlobalStyles";

const FullScreenSpinner = () =>{
    return (
        <Wrapper>
            <Loader
            type="Audio"
            color= {COLORS.primary}
            height={80}
            width={80}          
            />
        </Wrapper>
      );
}

const Wrapper = styled.div`   
    background-color:  ${COLORS.black};
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

`;

export default FullScreenSpinner;