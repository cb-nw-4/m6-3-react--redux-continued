
import { createGlobalStyle } from 'styled-components';

export const COLORS = {
   
  primary: "#FF4FD8",
  secondary : '#3354FF',
  black: '#0B0F14',
  gray: '#797F86',
  white: '#FFFFFF',
  grayFade: 'rgba(75, 75, 75, 0.4)'
};


const GlobalStyles = createGlobalStyle`
html,
body,
div,
span {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: Montserrat, sans-serif;
}
`;

export default GlobalStyles;