import React, { useContext} from 'react'
import InvoiceComponent from '../common/InvoiceComponent'
import CustomerContext from '../../context/CustomerContext/CustomerContext'
 const CustomerInvoice = () => {
  const { invoice } = useContext(CustomerContext);

  const invoiceItem = invoice[0].products || []

  const invoiceAccount = invoice[0]

  const BalanceArray = invoiceItem.map(function(product) {
    return product.sellingPrice*product.quantity;
  });
  
  const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;;
  }, 0)


    return (
    <div>
      <InvoiceComponent  invoiceItem={invoiceItem}  invoiceAccount={invoiceAccount}  totalPrice={totalPrice}/>

    </div>
    )
}
export default CustomerInvoice;
