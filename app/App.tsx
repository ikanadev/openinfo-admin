import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { resetContext, getContext } from 'kea';
import { Provider } from 'react-redux';

import Main from 'pages/Index';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Admin from 'pages/Admin';
import NotificationCont from 'components/Notifications';

resetContext();

const App: FC = () => (
  <Provider store={getContext().store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/registro">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
      <NotificationCont />
    </BrowserRouter>
  </Provider>
);

export default App;
