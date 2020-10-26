import {
    CREATE_INVOICE,
    GET_INVOICE,
    GET_SALE_INFO,
    GET_RECENT_SALE,
    GET_SALE_INFO_BY_DAY,
    GET_TODAY_SALE,
    GET_INVOICES,
    DELETE_INVOICE,
    CLEAR_SUCCESS,
    CLEAR_ERROR,
    ERROR,
    GET_INVOICE_PRODUCT,
    GET_INVOICE_CUSTOMER,
    INCREMENT,
    DECREMENT,
    CLEAR_APPLICATION_STATE,
} from '../type'

export default (state,action)=>{
  switch(action.type){
    case GET_INVOICES:
      return{
      ...state,
      invoices: action.payload.invoices,
      // success: action.payload.success,
      // serverMessage: action.payload.msg,
    }

    case GET_SALE_INFO:
      return{
        ...state,
        saleInfo: action.payload.totalSaleInfo,
        // success: action.payload.success,
        serverMessage: action.payload.msg,
      }

    case GET_RECENT_SALE:
        return{
          ...state,
          recentSale: action.payload.recentSale,
          // success: action.payload.success,
          serverMessage: action.payload.msg,
        }
        case GET_SALE_INFO_BY_DAY:
          return{
            ...state,
            recentSaleByDay: action.payload.totalSaleInfoByDay,
            // success: action.payload.success,
            serverMessage: action.payload.msg,
          }
      case GET_TODAY_SALE:
        return{
          ...state,
          todaySale: action.payload.todaySale,
          // success: action.payload.success,
          serverMessage: action.payload.msg,
        }


    case GET_INVOICE:
      return{
        ...state,
        invoice: action.payload.invoice,
        // success: action.payload.success,
        // serverMessage: action.payload.msg,
      }

    case CREATE_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload.invoice],
        invoice: action.payload.invoice,
        success: action.payload.success,
        serverMessage: action.payload.msg,
      }

    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(invoice => invoice._id !==  action.payload.invoice._id),
        // success: action.payload.success,
        serverMessage: action.payload.msg,
      }

    case CLEAR_SUCCESS:
      return{
        ...state,
        success: false,
        serverMessage: null,
      }
    case ERROR:
      return {
        ...state,
        // success: action.payload.success,
        serverMessage:action.payload.msg
      }

    case CLEAR_ERROR:
      return {
        ...state,
        success: false,
        serverMessage: null
      }
      case  GET_INVOICE_PRODUCT:
        return{
        ...state,
        card:action.payload
                 
        }
    case  GET_INVOICE_CUSTOMER:
          return{
          ...state,
          invoiceCustomer:action.payload
                   
          }
      case  INCREMENT:
            return{
              ...state,
              card:action.payload               
          }
      case  DECREMENT:
          return{
          ...state,
          card:action.payload
                            
          }

    case CLEAR_APPLICATION_STATE:
          return{
            invoices: [],
            invoice:{},
            saleInfo:[],
            todaySale:[],
            recentSaleByDay:{},
            recentSale:[],
            serverMessage: null,
            success: false,
            card:[],
            invoiceCustomer:{}
          }
    default:
      return state
  }
}