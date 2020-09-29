import {
    SUCCESS_REGISTER,
    SUCCESS_LOGIN,
    LOAD_USER,
    DELETE_USER,
    UPDATE_USER, 
    CHANGE_PASSWORD,
    LOGOUT,

} from '../type'

export default (state,action)=>{
    switch(action.type){
        case SUCCESS_LOGIN:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                isAuthenticate:true,
            }
        case LOAD_USER:
            return{
                ...state,
                user: action.payload.data,
            }
        case SUCCESS_REGISTER:
            localStorage.setItem('token',action.payload.token)
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