import React from 'react';
import User from './components/user';
import Admin from './components/admin';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={User}/>
      </Switch>
    </Router>
  );
}

export default App;