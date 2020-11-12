import React,{useReducer} from 'react';
import axios from 'axios';
import ProductContext from '../ProductContext/ProductContext';
import ProductReducer from '../ProductContext/ProductReducer';

import {
  GET_PRODUCT,
  GET_PRODUCT_INFO,
  UPDATE_PRODUCT,
  UPLOAD_PRODUCT,
  DELETE_PRODUCT,
  ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  EDIT_FORM,
  CLEAR_EDIT_FORM,
  CLEAR_APPLICATION_STATE

} from '../type'

const ProductState=(props)=> {
const initialState={
  products: [],
  productInfo:[],
  editForm:{},
  invoiceProducts:[],
  serverMessage: null,
  success: false,
}

const [state,dispatch]=useReducer(ProductReducer,initialState)

//  get all product by user
const getProducts = async () => {
try{
  const res = await axios.get('/api/product')
    dispatch({ type: GET_PRODUCT, payload: res.data })
    clearSuccess()
}catch (err) {  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }}

 //upload product
const uploadProduct= async data=>{
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    const config = { headers: { 'Content-type': 'multipart/form-data' }};
try{
    const res= await axios.post('/api/product',formData,config)
    dispatch({ type:UPLOAD_PRODUCT, payload:res.data });
    clearSuccess()
}catch (err){  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
    }}
    


// delete product
const deleteProduct = async (id)=>{
try{
    const res=await axios.delete(`/api/product/${id}`)
    dispatch({ type:DELETE_PRODUCT, payload:res.data });
    clearSuccess()
}catch (err){  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
  }}


//update product
const updateProduct=async(product)=>{
  const config={ header:{'Content-Type':'application/json'}}
try {
  const res=await axios.put(`/api/product/${product._id}`,product,config)
  dispatch({ type:UPDATE_PRODUCT, payload:res.data });
  clearSuccess()
    } catch (err) {
        dispatch({ type: ERROR, payload: err.response.data })
        clearError();
    }
  }

  //  get all info by user
const getAllProductInfo = async () => {
  try{
    const res = await axios.get('/api/product/info')
      dispatch({ type: GET_PRODUCT_INFO, payload: res.data })
      clearSuccess()
  }catch (err) {  
      dispatch({ type: ERROR, payload: err.response.data })
      clearError();
    }}

  //edit product
const editFormFun=(product)=>{
  dispatch({ type:EDIT_FORM, payload:product }) ;
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

  const clearProductState = () =>{
      dispatch({
        type:CLEAR_APPLICATION_STATE,
      })
  
  }



    return (
        <ProductContext.Provider value={{
          products: state.products,
          productInfo:state.productInfo,
          editForm: state.editForm,
          serverMessage: state.serverMessage,
          success:state.success,
          getProducts,
          getAllProductInfo,
          uploadProduct,
          updateProduct,
          editFormFun,
          clearEditForm,
          deleteProduct,
          clearProductState
       
    }}>
      {props.children}
    </ProductContext.Provider >
    )
}
export default ProductState;