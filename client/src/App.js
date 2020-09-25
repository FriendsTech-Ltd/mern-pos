
import React from 'react';
import {BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import SignIn from './Pages/signIn'
import SignUp from './Pages/signUp'

import './App.css';



function App() {


  return (
          
            <BrowserRouter>
        
                <div className='App'>
                  <NavBar/>
              
                  <Switch>
                 
                    <Route exact path = '/' component={Home}/>
                    <Route exact  path="/signin" component={SignIn}/>
                    <Route exact  path="/signup" component={SignUp}/>
                 
                   
                  </Switch>
              
                </div>
           
            </BrowserRouter>
         
  );
}

export default App;