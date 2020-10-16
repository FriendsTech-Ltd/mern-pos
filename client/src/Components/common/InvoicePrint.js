import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceComponent from './InvoiceComponent'
 
class ComponentToPrint extends React.Component {
 
  render() {
  
    return (
        <div>
         
            <InvoiceComponent/>
         
     
        </div>
    );
  }
}
 
const InvoicePrint = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <div >
      <ComponentToPrint ref={componentRef} />
   
    <div >
    <button onClick={handlePrint}>Print</button>
    </div>
  
      
    </div>
  );
};
export default InvoicePrint