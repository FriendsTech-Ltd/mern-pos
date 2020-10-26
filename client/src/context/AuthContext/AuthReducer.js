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

export default (state,action)=>{
  switch(action.type){
    case ERROR:
      return {
        ...state,
        success: false,
        serverMessage: action.payload.msg
      }
      case CLEAR_ERROR:
          return {
              ...state,
              serverMessage: null,
              success: null
          }
      case REGISTER_VERIFICATION:
          return {
              ...state,
              serverMessage: action.payload.data,
              success: action.payload.success
          }
      case SUCCESS_LOGIN:
      case SUCCESS_REGISTER:
      case RESET_PASSWORD:
           localStorage.setItem('token',action.payload.token)
           return{
              ...state,
              isAuthenticated:true,
            }
      case LOAD_USER:
            return{
              ...state,
              isAuthenticated: true,
              user: action.payload.data,
          }
    
       case LOGOUT:
       case CHANGE_PASSWORD:
       case DELETE_USER:
           localStorage.removeItem('token')
            return{
              isAuthenticated: false,
              user:{},
            }
      case  UPDATE_USER:
            return{
            ...state,
            user: action.payload.user,
            success:action.payload.success,
            serverMessage: action.payload.msg,
            }
     
    case CLEAR_SUCCESS:
              return{
              ...state,
              success:false,
              serverMessage:null,
                      }
  
   case FORGOT_REQUEST:
              return{
              ...state,
              serverMessage: action.payload.msg,
              success: action.payload.success
              } 
      default:
          return state
    }
}