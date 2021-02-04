import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
        <p>TODO</p>
    </Router>
  );
};

export default App;
