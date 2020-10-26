import React,{useReducer} from 'react';
import axios from 'axios';
import CustomerContext from '../CustomerContext/CustomerContext';
import CustomerReducer from '../CustomerContext/CustomerReducer';

import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  GET_TOTAL_CUSTOMER,
  GET_INVOICE,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  EDIT_FORM,
  CLEAR_EDIT_FORM,
  PAY_DUE,
  CLEAR_APPLICATION_STATE
} from '../type'

const CustomerState=(props)=> {
const initialState={
  customers: [],
  customer:{},
  totalCustomer:[],
  invoice:{},
  editForm:{},
  serverMessage: null,
  success: false,
}

const [state,dispatch]=useReducer(CustomerReducer,initialState)

//  get all customer by user
const getCustomers = async () => {
try{
  const res = await axios.get('/api/customer')
    dispatch({ type: GET_CUSTOMERS, payload: res.data })
    clearSuccess()
}catch (err) {  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }}

  //  get customer by user
const getCustomer = async (id) => {
  try{
    const res = await axios.get(`/api/customer/details/${id}`)
      dispatch({ type: GET_CUSTOMER, payload: res.data })
      clearSuccess()
  }catch (err) {  
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
    }}



      //  get all info by user
const getTotalCustomer = async () => {
  try{
    const res = await axios.get('/api/customer/count')
      dispatch({ type: GET_TOTAL_CUSTOMER, payload: res.data })
      clearSuccess()
  }catch (err) {  
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
    }}

 //create customer
const createCustomer = async data=>{
    const config = { headers: { 'Content-type': 'application/json' }};
try{
    const res= await axios.post('/api/customer',data,config)
      dispatch({ type: CREATE_CUSTOMER, payload:res.data });
      clearSuccess()
}catch (err){  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
    }}
    


// delete customer
const deleteCustomer = async (id)=>{
try{
    const res=await axios.delete(`/api/customer/${id}`)
      dispatch({ type:DELETE_CUSTOMER, payload:res.data });
      clearSuccess()
}catch (err){  
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
  }}


//update customer
const updateCustomer = async(customer)=>{
    const config={ header:{'Content-Type':'application/json'}}
try {
  const res=await axios.put(`/api/customer/${customer._id}`,customer,config)
        dispatch({ type: UPDATE_CUSTOMER, payload:res.data });
        clearSuccess();
    } catch (err) {
        dispatch({ type: ERROR, payload: err.response.data })
        clearError();
    }
  }

  //pay due amount
const payDue= async(data)=>{
  const config={ header:{'Content-Type':'application/json'}}
 
try {
  const res=await axios.put('/api/customer/due/pay',data,config)
      dispatch({ type: PAY_DUE, payload:res.data });
      clearSuccess();
  } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
  }
}

  //edit customer
const editFormFun=(customer)=>{
  dispatch({ type:EDIT_FORM, payload:customer }) ;
}

//clear edit form
const clearEditForm=()=>{
  dispatch({ type:CLEAR_EDIT_FORM }) 
}

  const clearError = () =>{
    setTimeout(() => { 
      dispatch({
        type:CLEAR_ERROR,
      })
    }, 5000);
  }

  const clearSuccess = () =>{
    setTimeout(() => { 
      dispatch({
        type:CLEAR_SUCCESS,
      })
    }, 3000);
  }


  const getInvoice = (id)=>{
    dispatch({
      type: GET_INVOICE, payload: id
    })
  }
  // customer state clear
  const clearCustomerState = ()=>{
    dispatch({
      type: CLEAR_APPLICATION_STATE
    })
  }


    return (
        <CustomerContext.Provider value={{
          customers: state.customers,
          customer: state.customer,
          totalCustomer:state.totalCustomer,
          editForm: state.editForm,
          serverMessage: state.serverMessage,
          success:state.success,
          invoice:state.invoice,
          getCustomers,
          getCustomer,
          getTotalCustomer,
          createCustomer,
          updateCustomer,
          editFormFun,
          clearEditForm,
          deleteCustomer,
          getInvoice,
          payDue,
          clearCustomerState
    }}>
      {props.children}
    </CustomerContext.Provider >
    )
}
export default CustomerState;