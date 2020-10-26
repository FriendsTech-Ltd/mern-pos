import React,{useContext} from 'react'
import  AuthContext from '../context/AuthContext/AuthContext'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute=({component: Component, ...rest})=>{
    const {isAuthenticated}=useContext(AuthContext)
    return(
   <Route
   {...rest}
   render={props=> !isAuthenticated? (<Redirect to='/'/>) : (<Component {...props} />)}
   
   />
    )
    
}

export default PrivateRoute