import React from 'react';
import Loader from "react-loader-spinner";
import {COLORS} from '../constants'
import styled from 'styled-components'


const FullScreenSpinner = () => {
    return (
        <Wrapper>
            <Loader
            type="Audio"
            color={COLORS.Primary}
            height={50}
            width={50}
            timeout={3000} //3 secs
            />

        </Wrapper>
    );
}


const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;

`


export default FullScreenSpinner;