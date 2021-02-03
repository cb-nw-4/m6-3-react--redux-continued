import React from "react";
import GlobalStyles from "../GlobalStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ArtistPage from "./ArtistPage";

const DEFAULT_ARTIST_ID = "7BMccF0hQFBpP6417k1OtQ";

const App = () => {
  return (
    <GlobalStyles>
      <Router>
        <Switch>
          <Route exact path="/artists/:id">
            <ArtistPage />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
      ;
    </GlobalStyles>
  );
};

export default App;
