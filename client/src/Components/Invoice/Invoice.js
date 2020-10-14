import React, { useContext, useEffect, useState } from 'react'
import InvoiceComponent from '../common/InvoiceComponent'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'

 const Invoice = (props) => {
  const { getInvoice,invoice } = useContext(InvoiceContext);

  // useEffect(() => {
  //   getInvoice(props.match.params.id);
  //   // eslint-disable-next-line
  // }, []);



const data = invoice[0] || []

const invoiceItem = data.products || []

const invoiceAccount =data


  const BlanceArray = invoiceItem.map(function(product) {
    return product.sellingPrice*product.quantity;
  });
  
  const totalPrice = BlanceArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;;
  }, 0)


    return (
    <div>
      <InvoiceComponent  invoiceItem={invoiceItem}  invoiceAccount={invoiceAccount}  totalPrice={totalPrice} />

    </div>
    )
}
export default Invoice;
