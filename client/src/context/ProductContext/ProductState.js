import React,{useReducer} from 'react';
import axios from 'axios';
import ProductContext from '../ProductContext/ProductReducer';
import ProductReducer from '../ProductContext/ProductReducer';

import {
 GET_PRODUCT,
 UPDATE_PRODUCT,
 UPDATE_PRODUCT,
 DELETE_PRODUCT,
 ERROR,
 CLEAR_ERROR,
 EDIT_FORM,
 CLEAR_EDIT_FORM
} from '../type'

const ProductState=(props)=> {
const initialState={
  products: [],
  editForm:{},
  serverMessage: null,
  success: false,
}

const [state,dispatch]=useReducer(AuthReducer,initialState)

//  get all product by user
const getProduct = async () => {
try{
  const res = await axios.post('/api/product')
    dispatch({ type: GET_PRODUCT, payload: res.data })
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
    const res= await Axios.post('/api/product',formData,config)
    dispatch({ type:UPLOAD_PRODUCT, payload:res.data });
}catch (err){  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
    }}
    


// delete product
const deleteProduct = async (id)=>{
try{
    const res=await Axios.delete(`/api/product/${id}`)
    dispatch({ type:DELETE_PRODUCT, payload:res.data });
}catch (err){  
    dispatch({ type: ERROR, payload: err.response.data })
    clearError();
    }}


//update product
 const updateProduct=async(product)=>{
    const config={ header:{'Content-Type':'application/json'}}
    const res=await Axios.put(`/api/product/${product._id}`,product,config)
try {
    dispatch({ type:UPDATE_PRODUCT, payload:res.data });
    } catch (err) {
        dispatch({ type: ERROR, payload: err.response.data })
        clearError();
    }
   
  }

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

    return (
        <ProductContext.Provider value={{
          Products: state.products,
          editForm: state.editForm,
          serverMessage: state.serverMessage,
          getProduct,
          uploadProduct,
          updateProduct,
          editFormFun,
          clearEditForm
    }}>
      {props.children}
    </ProductContext.Provider >
    )
}
export default ProductState;