import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from 'pages/Index';
import Login from 'pages/Login';
import Admin from 'pages/Admin';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
