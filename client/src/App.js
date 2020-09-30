
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'
import Dashboard from './Components/Dashboard/Dashboard'
import Info from './Pages/Info';

import AuthState from './context/AuthContext/AuthState'

import './App.css';

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path = '/' component={Home}/>
            <Route exact  path="/dashboard" component={Dashboard}/>
            <Route exact  path="/login" component={SignIn}/>
            <Route exact  path="/register" component={SignUp}/>
            <Route exact  path="/info" component={Info}/>
          </Switch>
        </div>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;