import React from 'react';
import User from './components/user';
import Admin from './components/admin';
import {BrowserRouter as Router, Route, Switch, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={User}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;