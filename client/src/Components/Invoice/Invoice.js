import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InvoiceComponent from '../common/InvoiceComponent'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  printButton:{
    marginRight:90
  },

  content:{
     margin:8,
     flexGrow: 1,
     textAlign: 'center',
  height: '77vh',
  overflow: 'auto',
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },

}))

 const Invoice = () => {
     const classes = useStyles()
  const { invoice } = useContext(InvoiceContext);

  const invoiceItem = invoice.products || []


  const BalanceArray = invoiceItem.map(function(product) {
    return product.sellingPrice*product.quantity;
  });
  
  const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;;
  }, 0)


    return (
    <div className={classes.printButton} >
      <InvoiceComponent  invoiceItem={invoiceItem}  invoiceAccount={invoice}  totalPrice={totalPrice} />

    </div>
    )
}
export default Invoice;
