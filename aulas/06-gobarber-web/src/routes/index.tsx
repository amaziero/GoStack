import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
