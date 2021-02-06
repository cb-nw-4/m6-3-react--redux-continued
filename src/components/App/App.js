import React from 'react';
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ArtistRoute from "./ArtistRoute";

const DEFAULT_ARTIST_ID = "06HL4z0CvFAxyc27GXpf02";

const App = () => {

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
