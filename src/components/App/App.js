import React from "react";
import GlobalStyles from "../GlobalStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ArtistPage from "./ArtistPage";

const App = () => {
  const DEFAULT_ARTIST_ID = "7BMccF0hQFBpP6417k1OtQ";
  return (
    <>
      <GlobalStyles/>
      <Router>
        <Switch>
          <Route exact path="/">
            <div>hello</div>
          </Route>
          <Route exact path="/artists/:id">
            <ArtistPage />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
