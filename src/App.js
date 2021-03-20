import React, { createContext, useState } from 'react';
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
import Map from './Component/Map/Map';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Contact from './Component/Contact/Contact';
import Blog from './Component/Blog/Blog';

export const userContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          {/* this is the dynamic path  */}
          <PrivateRoute path='/map/:vehicleName'>
            <Map></Map>
          </PrivateRoute>
          <PrivateRoute path='/map'>
            <Map></Map>
          </PrivateRoute>
          <Route path='/blog'>
            <Blog></Blog>
          </Route>
          <Route path='/contact'>
            <Contact></Contact>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='*'>
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
};

export default App;