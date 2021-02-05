import React, {useEffect} from 'react';
import GlobalStyles from '../../GlobalStyles';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import ArtistRoute from "../ArtistRoute";
import {requestAccessToken, receiveAccessToken, receiveAccessTokenError} from "../../actions";


const DEFAULT_ARTIST_ID = '2CIMQHirSU0MQqyYHq0eOx';


const App = () => {

  const dispatach = useDispatch()
  const accessArtist = useSelector((state) => state.artists.data )
  

  useEffect(() => {

    dispatach(requestAccessToken())
    
    fetch('/spotify_access_token')
    .then(res => res.json())
    .then((json) => {
      dispatach(receiveAccessToken(json.access_token));
    })
    .catch((error) =>{
      console.log('error', error)
      dispatach(receiveAccessTokenError())
    })
  }, [accessArtist]);



  return <Router>
    <GlobalStyles /> 
    <div>
      <Switch>

        <Route path='/artists/:ArtistId' >
          <ArtistRoute />
        </Route>
        <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
      
      </Switch>
    </div>
  </Router>

};

export default App;
