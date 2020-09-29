
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'
import Dashboard from './Components/Dashboard/Dashboard'

import './App.css';



function App() {


  return (
          
            <BrowserRouter>
        
                <div className='App'>
          
              
                  <Switch>
                 
                    <Route exact path = '/' component={Home}/>
                    <Route exact  path="/login" component={SignIn}/>
                    <Route exact  path="/register" component={SignUp}/>
                    <Route exact  path="/dashboard" component={Dashboard}/>
                 
                   
                  </Switch>
              
                </div>
           
            </BrowserRouter>
         
  );
}

export default App;