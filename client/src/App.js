
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './Components/layout/NavBar'
import Home from './Pages/Home'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'
import Dashboard from './Components/Dashboard/Dashboard'

import AuthState from './context/AuthContext/AuthState'

import './App.css';

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <div className='App'>
          <NavBar/>
          <Switch>
            <Route exact path = '/' component={Home}/>
            <Route exact  path="/dashboard" component={Dashboard}/>
            <Route exact  path="/login" component={SignIn}/>
            <Route exact  path="/register" component={SignUp}/>
          </Switch>
        </div>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;