
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './Components/layout/Footer'
import SignIn from './Components/Auth/SignIn'
import DemoLogIn from './Components/Auth/DemoLogIn'
import SignUp from './Components/Auth/SignUp'
import ForgotPassword from './Components/Auth/ForgotPassword'
import ResetPassword from './Components/Auth/ResetPassword'
import RegisterVerify from './Components/Auth/RegisterVerify'
import Dashboard from './Components/Dashboard/Dashboard'
import Info from './Pages/Info';

import AuthState from './context/AuthContext/AuthState';
import ProductState from './context/ProductContext/ProductState';
import CustomerState from './context/CustomerContext/CustomerState'
import InvoiceState from './context/InvoiceContext/InvoiceState'

import PrivateRoute from './Routing/PrivateRoute'

import './App.css';

function App() {
  return (
    <AuthState>
      <ProductState>
        <CustomerState>
          <InvoiceState>
            <BrowserRouter>
              <div className='App'>
                <Switch>
                  <Route exact  path="/" component={SignIn}/>
                  <Route exact  path="/demo-login" component={DemoLogIn}/>
                  <Route exact  path="/register" component={SignUp}/>
                  <Route exact  path="/forgot" component={ForgotPassword}/>
                  <Route exact  path="/verify/:token" component={RegisterVerify}/>
                  <Route exact  path="/reset/:token" component={ResetPassword}/>
                  <Route exact  path="/info" component={Info}/>
                  <PrivateRoute exact  path="/dashboard" component={Dashboard}/>
                  <PrivateRoute exact  path="/dashboard/:comp" component={Dashboard}/>
                  <PrivateRoute exact  path="/dashboard/:comp/:cop" component={Dashboard}/>
                  
                </Switch>

                <Footer/>
            </div>
          </BrowserRouter>
          </InvoiceState>
        </CustomerState>
      </ProductState>
    </AuthState>
  );
}

export default App;