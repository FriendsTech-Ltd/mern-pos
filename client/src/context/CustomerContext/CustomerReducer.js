import {
    GET_CUSTOMERS,
    CREATE_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    ERROR,
    CLEAR_ERROR,
    CLEAR_SUCCESS,
    EDIT_FORM,
    CLEAR_EDIT_FORM
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_CUSTOMERS:
                return{
                ...state,
                customers: action.payload.customer,
                success:action.payload.success,
                serverMessage: action.payload.msg,
            }
            case CREATE_CUSTOMER:
                return{
                ...state,
                customers: [...state.customers, action.payload.customer],
                success:action.payload.success,
                serverMessage: action.payload.msg,
                }
                case DELETE_CUSTOMER:
                return {
                ...state,
                customers: state.customers.filter(customer => customer._id !==  action.payload.customer._id),
                success:action.payload.success,
                serverMessage: action.payload.msg,
                }

            case  UPDATE_CUSTOMER:
                return{
                ...state,
                customers :state.customers.map(customer=>customer._id === action.payload.customer._id ? action.payload.customer:customer),
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
                 success: action.payload.success,
                 serverMessage:action.payload.msg
                         }
           case CLEAR_ERROR:
                  return{
                  ...state,
                  success: false,
                  serverMessage: null
                  }
 
        default:
            return state
    }
}