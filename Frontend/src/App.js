import React from 'react';
import User from './components/user';
import Admin from './components/admin';
import SignUp from './components/sign-up';
import Profile from './components/profile';
import {BrowserRouter as Router, Route, Switch, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/" component={User}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;