import {
    GET_PRODUCT,
    GET_PRODUCT_INFO,
    UPLOAD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    EDIT_FORM,
    CLEAR_EDIT_FORM,
    CLEAR_ERROR,
    ERROR,
    CLEAR_SUCCESS,
    CLEAR_APPLICATION_STATE
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_PRODUCT:
                return{
                ...state,
                products: action.payload.products,
                // success:action.payload.success,
                // serverMessage: action.payload.msg,
            }
            case GET_PRODUCT_INFO:
                return{
                ...state,
                productInfo: action.payload.productInfo,
                // success:action.payload.success,
                // serverMessage: action.payload.msg,
            }
            case UPLOAD_PRODUCT:
                return{
                ...state,
                products: [...state.products, action.payload.product],
                success:action.payload.success,
                serverMessage: action.payload.msg,
                }
                case DELETE_PRODUCT:
                return {
                ...state,
                products: state.products.filter(product => product._id !==  action.payload.product._id),
                // success:action.payload.success,
                serverMessage: action.payload.msg,
                }

            case  UPDATE_PRODUCT:
                return{
                ...state,
                products:state.products.map(product=>product._id === action.payload.product._id ? action.payload.product:product),
                success:action.payload.success,
                serverMessage: action.payload.msg,
                }
  

            case EDIT_FORM:
                return{
                ...state,
                editForm:action.payload
                         
                }

           case CLEAR_EDIT_FORM:
                return{
                ...state,
                 editForm:null
                } 

            case CLEAR_SUCCESS:
                return{
                ...state,
                success:false,
                serverMessage:null,
                        }
            case ERROR:
                 return{
                ...state,
                //  success: action.payload.success,
                 serverMessage:action.payload.msg
                         }
           case CLEAR_ERROR:
                  return{
                  ...state,
                  success: false,
                  serverMessage: null
                  }
            case CLEAR_APPLICATION_STATE:
            return{
                products: [],
                productInfo:[],
                editForm:{},
                invoiceProducts:[],
                serverMessage: null,
                success: false,
            }

        default:
            return state
    }
}
