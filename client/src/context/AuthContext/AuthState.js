import React,{useReducer} from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext/AuthContext';
import AuthReducer from '../AuthContext/AuthReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
     SUCCESS_REGISTER,
     SUCCESS_LOGIN,
     LOAD_USER,
     DELETE_USER,
     UPDATE_USER, 
     CHANGE_PASSWORD,
     LOGOUT
    
} from '../type'

const AuthState=(props)=> {
    const initialState={
       isAuthenticated: false,
       user: {},
       editForm:{},   
    }

const [state,dispatch]=useReducer(AuthReducer,initialState)

//  register user
const register = async user => {
    const config={
        header:{ 'Content-Type':'application/json' }
    }
try{
    const res=await axios.post('/api/register',user,config)
        dispatch({
        type:SUCCESS_REGISTER,
        payload:res.data.data
        })
}catch (err){  
        console.log(err)
       }
}


//Login   
const login = async data=>{
    const config={
        header:{ 'Content-Type':'application/json' }
    }
try{
    const res=await axios.get('/api/login',data,config)
    dispatch({
    type:SUCCESS_LOGIN,
    payload:res.data,
    })          

}catch (err){ 
console.log(err)
}

}
// load user
const loadUser = async () => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get('/api/auth/me');
        dispatch({
          type: LOAD_USER,
          payload: res.data
        })
      } catch (err) {
         console.log(err)
    }
  }
}

// delete user
const deleteUser = async (id)=>{

try{
        const res=await axios.delete(`/api/auth/${id}`)
    dispatch({
        type:DELETE_USER,
        payload:res.data.data
    })

}catch (err){  
    console.log(err)
}
}

//update user
const updateUser = async(user)=>{
const config={
    header:{
        'Content-Type':'application/json'
    }
}
const res=await axios.put(`/api/auth/${user._id}`,user,config)
try {  
    dispatch({
        type:UPDATE_USER,
        payload:res.data.data
    }) 
} catch (err) {
   console.log(err)
}
}

// change password 
const changePassword = async data=>{
    const config={
        header:{
            'Content-Type':'application/json'
            }
    }
try{
    const res=await axios.put('/api/change-password',data,config)
    dispatch({
    type:CHANGE_PASSWORD,
    payload:res.data.data,
    })  
}catch (err){ 
  console.log(err)  
}
}

// log out  test complete
const logout=()=>{
    dispatch({
    type: LOGOUT
    })
}


    return (
        <AuthContext.Provider value={{
            isAuthenticate: state.isAuthenticate,
            user: state.user,
            editForm: state.editForm,
            register,
            login,
            loadUser,
            updateUser,
            deleteUser,
            changePassword,
            logout    
    }}>
       {props.children}
    </AuthContext.Provider >
    )
}
export default AuthState;