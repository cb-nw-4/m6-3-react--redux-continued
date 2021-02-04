import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyles from "./GlobalStyles";
import ArtistRoute from "./ArtistRoute";

const DEFAULT_ARTIST_ID = '4lpCk4elOX2vusSgqHVT56';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
        <Redirect from="/artists/:id" to={`/artists/${DEFAULT_ARTIST_ID}`}/>
        <Route path={`/artists/${DEFAULT_ARTIST_ID}`}>
          <ArtistRoute />
        </Route>
    </Router>
  );
};

export default App;
