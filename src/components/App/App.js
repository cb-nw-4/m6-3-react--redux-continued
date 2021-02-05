import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import GlobalStyles from "../GlobalStyles";
import ArtistRoute from '../ArtistRoute';

const DEFAULT_ARTIST_ID='6fWVd57NKTalqvmjRd2t8Z'; //24kGoldn
const defaultPath = "/artists/"+DEFAULT_ARTIST_ID;

const App = () => {
  return <Router>
    <GlobalStyles/>
    <Switch>
    <Route exact path='/'>
        <Redirect to={defaultPath}/>
      </Route>
      <Route exact path='/artists/:id'>
        <ArtistRoute/>
      </Route>
    </Switch>
  </Router>;
};



export default App;
