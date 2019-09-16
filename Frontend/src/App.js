import React from 'react';
import User from './components/user';
import Admin from './components/admin';
import SignUp from './components/sign-up';
import SignIn from './components/sign-in';
import Profile from './components/profile';
import {BrowserRouter as Router, Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/" component={User}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;