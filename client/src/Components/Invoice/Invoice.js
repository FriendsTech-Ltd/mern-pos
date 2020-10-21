import React, { useContext } from 'react'
import InvoiceComponent from '../common/InvoiceComponent'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'

 const Invoice = () => {
  const { invoice } = useContext(InvoiceContext);

  

const data = invoice[0] || []

const invoiceItem = data.products || []

const invoiceAccount =data


  const BalanceArray = invoiceItem.map(function(product) {
    return product.sellingPrice*product.quantity;
  });
  
  const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;;
  }, 0)


    return (
    <div>
      <InvoiceComponent  invoiceItem={invoiceItem}  invoiceAccount={invoiceAccount}  totalPrice={totalPrice} />

    </div>
    )
}
export default Invoice;
