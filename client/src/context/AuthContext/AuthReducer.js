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
    ERROR,
} from '../type'

export default (state,action)=>{
  switch(action.type){
    case ERROR:
      return {
        ...state,
        serverMessage: action.payload.msg
      }
      case CLEAR_ERROR:
          return {
              ...state,
              serverMessage: action.payload
          }
      case REGISTER_VERIFICATION:
          return {
              ...state,
              serverMessage: action.payload.data,
              success: action.payload.success
          }
      case SUCCESS_LOGIN:
          localStorage.setItem('token',action.payload.token)
          return{
              ...state,
              isAuthenticate:true,
          }
      case LOAD_USER:
          return{
              ...state,
              isAuthenticated: true,
              user: action.payload.data,
          }
      case SUCCESS_REGISTER:
          localStorage.setItem('token', action.payload.token)
          return{
              ...state,
              isAuthenticate:true,
          }  
          
      case LOGOUT:
      case CHANGE_PASSWORD:
      case DELETE_USER:
          localStorage.removeItem('token')
            return{
              isAuthentication: false,
              user:{},
            }
        
      case  UPDATE_USER:
              return{
              ...state,
              user: action.payload.user,
          
                  }

      default:
          return state
    }
}