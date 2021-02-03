import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import ArtistRoute from '../ArtistRoute';

const DEFAULT_ARTIST_ID = '11Y54BxlxC3UIAUkU2eadQ';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={'/artists/' + DEFAULT_ARTIST_ID} />
          </Route>
          <Route exact path="/artists/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
