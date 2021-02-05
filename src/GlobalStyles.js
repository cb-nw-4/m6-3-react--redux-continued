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

    /* 2436x1125px at 458ppi */
@media only screen 
    and (device-width: 375px) 
    and (device-height: 812px) 
    and (-webkit-device-pixel-ratio: 3) {
        background-color: ${COLORS.Charcoal};

    h2, h3{
        font-weight: 700;
        color: ${COLORS.White};
    }

    p, ul, li{
        color: ${COLORS.White};

    }

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