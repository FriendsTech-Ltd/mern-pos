import React,{ useReducer } from 'react';
import axios from 'axios';
import InvoiceContext from './InvoiceContext';
import InvoiceReducer from './InvoiceReducer';

import {
  GET_INVOICE,
  GET_INVOICES,
  DELETE_INVOICE,
  CREATE_INVOICE,
  ERROR,
  CLEAR_SUCCESS,
  CLEAR_ERROR,
  GET_INVOICE_PRODUCT,
  GET_INVOICE_CUSTOMER,
  DECREMENT,
  INCREMENT,
} from '../type'

const InvoiceState = (props) => {
const initialState={
  invoices: [],
  invoice:{},
  serverMessage: null,
  success: false,
  card:[],
  invoiceCustomer:{}
}

const [state,dispatch]=useReducer(InvoiceReducer,initialState)

 // Create new invoice
const createInvoice = async data => {
  const config = { headers: { 'Content-type': 'application/json' }};
  try {
    const res= await axios.post('/api/invoice', data, config)
    dispatch({ type: CREATE_INVOICE, payload:res.data });
    clearSuccess()
  } catch (err) {  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
    }
  }

// Get all invoice
const getInvoices = async () => {
try{
  const res = await axios.get('/api/invoice')
    dispatch({ type: GET_INVOICES, payload: res.data })
    clearSuccess()
}catch (err) {  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }}

  // Get single invoice
const getInvoice = async (id) => {
  try{
    const res = await axios.get(`/api/invoice/${id}`)
    console.log(res)
      dispatch({ type: GET_INVOICE, payload: res.data })
      clearSuccess()
  }catch (err) {  
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
    }}

// Delete Invoice
const deleteInvoice = async (id)=>{
try{
    const res=await axios.delete(`/api/invoice/${id}`)
    dispatch({ type:DELETE_INVOICE, payload:res.data });
}catch (err){  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }}

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
    }, 5000);
  }

  const getInvoiceProducts = (value) =>{
    dispatch({ type:GET_INVOICE_PRODUCT, payload:value }) ;
  }

  const getInvoiceCustomer = (value) =>{
    dispatch({ type:GET_INVOICE_CUSTOMER, payload:value }) ;
  }


  const increment=(id)=>{
    let tempCart = state.card;
    const selectedProduct = tempCart.find(item =>  item._id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.quantity = product.quantity + 1;
    dispatch({
      type: INCREMENT,
      payload: tempCart
    })
   }

   const decrement=(id)=>{
    let tempCart = state.card
    const selectedProduct = tempCart.find(item =>  item._id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.quantity = product.quantity - 1;
    dispatch({
      type: DECREMENT,
      payload: tempCart
    })
    
   }


    return (
        <InvoiceContext.Provider value={{
          invoice: state.invoice,
          invoices: state.invoices,
          serverMessage: state.serverMessage,
          card:state.card,
          invoiceCustomer:state.invoiceCustomer,
          createInvoice,
          getInvoices,
          deleteInvoice,
          getInvoice,
          getInvoiceProducts,
          getInvoiceCustomer,
          decrement,
          increment
    }}>
      {props.children}
    </InvoiceContext.Provider >
    )
}
export default InvoiceState;