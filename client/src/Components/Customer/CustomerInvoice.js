import React, { useContext} from 'react'
import InvoiceComponent from '../common/InvoiceComponent'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'
 const CustomerInvoice = () => {
  const { invoice } = useContext(InvoiceContext);

  const invoiceItem = invoice.products || []


  const BalanceArray = invoiceItem.map(function(product) {
    return product.sellingPrice*product.quantity;
  });
  
  const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;;
  }, 0)


    return (
    <div>
      <InvoiceComponent  invoiceItem={invoiceItem}  invoiceAccount={invoice}  totalPrice={totalPrice}/>

    </div>
    )
}
export default CustomerInvoice;


