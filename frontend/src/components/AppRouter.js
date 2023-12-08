import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login.js';
import Signup from './Signup.js';
import Home from './Home.js';
import { AuthContext } from './context/AuthContext.js';

const AppRouter = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {

    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>

        <Route path="/home" exact>
          <Home />
        </Route>
        <Redirect to="/home" />

      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>

        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <>
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn, login: login,
        logout: logout,
      }}>
        <Router>
          {routes}
        </Router>

      </AuthContext.Provider>
    </>
  );
};

export default AppRouter;


