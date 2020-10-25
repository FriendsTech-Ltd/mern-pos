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
  LOGOUT,
  REGISTER_VERIFICATION,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  ERROR,
  FORGOT_REQUEST,
  RESET_PASSWORD,
} from '../type'

const AuthState=(props)=> {
const initialState={
  isAuthenticated: false,
  user: {},
  serverMessage: null,
  success: false,
}

const [state,dispatch]=useReducer(AuthReducer,initialState)

//  register user
const register = async user => {
const config={ header:{ 'Content-Type':'application/json' }}
  try{
  const res = await axios.post('/api/auth/register', user, config)
    dispatch({
    type: REGISTER_VERIFICATION,
    payload: res.data
    })
    clearSuccess();
  }catch (err) {  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }
}

// load user
const loadUser = async () => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get('/api/auth/me');
      dispatch({ type: LOAD_USER, payload: res.data })
      clearSuccess();
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
  }
}
}
//  verify user
const verifyUser = async (registerToken) => {

const config={ header:{ 'Content-Type':'application/json' }}
  try{
  const res=await axios.get(`/api/auth/verify/${registerToken}`, config)
    dispatch({ type: SUCCESS_REGISTER, payload:res.data });
    loadUser();
    clearSuccess();
  }catch (err) {  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }
}


//Login   
const login = async data=>{
const config = { header:{ 'Content-Type':'application/json' } }
try{
  const res = await axios.post('/api/auth/login', data, config)
  dispatch({ type: SUCCESS_LOGIN, payload: res.data });
  loadUser();  
  clearSuccess(); 
}catch (err){
  dispatch({ type: ERROR, payload: err.response.data })
  clearError();
}

}


// delete user

const deleteUser = async (data)=>{
  const config={ header:{'Content-Type':'application/json' }} 

  try{
        const res=await axios.post('/api/auth/delete',data,config)
        dispatch({ type:DELETE_USER, payload:res.data });
        clearSuccess()
  }catch (err){  
        dispatch({ type: ERROR, payload: err.response.data })
        clearError();
    }}


//update user
const updateUser = async(user)=>{
const config={ header:{'Content-Type':'application/json' }}

  try {  
    const res=await axios.put(`/api/auth/update/${user._id}`,user,config)
      clearSuccess();
      dispatch({ type:UPDATE_USER, payload:res.data }) 
  } catch (err) {
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }
}

// change password 
const changePassword = async data=>{
  const config={ header:{'Content-Type':'application/json' }}
try{
    const res=await axios.put('/api/auth/change-password',data,config)
    dispatch({type:CHANGE_PASSWORD,payload:res.data})  
    clearSuccess();
}catch (err){ 
  dispatch({ type: ERROR, payload: err.response.data })
  clearError(); 
}
}


// forgot request 
const forgoRequest = async (data) =>{
  const config={ header:{'Content-Type':'application/json' }}
  try{
      const res=await axios.post('/api/auth/forgot',data,config)
      dispatch({ type: FORGOT_REQUEST, payload:res.data })   
      clearSuccess();       
  }catch (err){ 
    dispatch({ type: ERROR, payload: err.response.data })
    clearError(); 
  }

}


//reset password
const resetPassword = async (data)=>{
  const config={ header:{'Content-Type':'application/json' }}
  try{
      const res=await axios.post(`/api/auth/reset/${data.token}`,{newPassword:data.newPassword,confirmPassword: data.confirmPassword },config)
      dispatch({
      type: RESET_PASSWORD,
      payload:res.data,
      })  
      loadUser()
      clearSuccess();        
  }catch (err){ 
    dispatch({ type: ERROR, payload: err.response.data })
    clearError(); 
  }

}

// log out  test complete
const logout=()=>{
    dispatch({type: LOGOUT})
  }


  const clearError = () =>{
    setTimeout(() => { 
      dispatch({
        type:CLEAR_ERROR,
      })
    }, 4000);
  }

  const clearSuccess = () =>{
    setTimeout(() => { 
      dispatch({
        type:CLEAR_SUCCESS,
      })
    }, 4000);
  }


    return (
        <AuthContext.Provider value={{
          isAuthenticated: state.isAuthenticated,
            user: state.user,
            serverMessage: state.serverMessage,
            success: state.success,
            register,
            login,
            loadUser,
            updateUser,
            deleteUser,
            changePassword,
            forgoRequest,
            resetPassword,
            logout,
            verifyUser,
    }}>
      {props.children}
    </AuthContext.Provider >
    )
}
export default AuthState;