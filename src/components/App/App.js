import React, {useEffect} from "react";
import GlobalStyles from "../GlobalStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ArtistPage from "./ArtistPage";
import {requestAccessToken, receiveAccessToken, receiveAccessTokenError} from '../actions'
import {useDispatch} from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const DEFAULT_ARTIST_ID = "7BMccF0hQFBpP6417k1OtQ";

  useEffect(() => {
    const fetchToken = async() => {
      dispatch(requestAccessToken())
      try {
        const body = await fetch('/spotify_access_token')
        const bodyJson = await body.json()
        const token = bodyJson.access_token
        dispatch(receiveAccessToken(token))
      }
      catch (e) {
        console.error(e)
        dispatch(receiveAccessTokenError())
      }
    }
    fetchToken()
  }, [])
  return (
    <>
      <GlobalStyles/>
      <Router>
        <Switch>
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
