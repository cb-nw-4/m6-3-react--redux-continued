import { createGlobalStyle } from 'styled-components';
import {COLORS} from './constants'

const GlobalStyles = createGlobalStyle`

html,
body,
div,
span {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;

    background-color: ${COLORS.Charcoal};

    h2, h3{
        font-weight: 700;
        color: ${COLORS.White};
    }

    p, ul, li{
        color: ${COLORS.White};

    }

    /* iPhone X ----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3){
/* Styles */
    body{
        display: grid;
        align-items: center;
        justify-content: center;
    }


}

@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3){
/* Styles */
    
}

    

}

/* GLOBAL STYLES */
*,
*:before,
*:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: Montserrat, sans-serif;
}
`

export default GlobalStyles;