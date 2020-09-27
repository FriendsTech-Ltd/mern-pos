
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './Components/layout/NavBar'
import Home from './Pages/Home'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'

import './App.css';



function App() {


  return (
          
            <BrowserRouter>
        
                <div className='App'>
                  <NavBar/>
              
                  <Switch>
                 
                    <Route exact path = '/' component={Home}/>
                    <Route exact  path="/login" component={SignIn}/>
                    <Route exact  path="/register" component={SignUp}/>
                 
                   
                  </Switch>
              
                </div>
           
            </BrowserRouter>
         
  );
}

export default App;