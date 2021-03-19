import React from 'react';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Navbar from './Component/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from './Component/NoMatch/NoMatch';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          {/* this is the dynamic path  */}
          {/* <Route path='/team-details/:idTeam'>
          
          </Route> */}
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='*'>
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;