import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  printButton:{
    marginRight:90
    // padding:5,
    // marginLeft: 'auto',
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
class ComponentToPrint extends React.Component {
 
  render() {
    
    return (
        <div>
         
            <Invoice/>
         
     
        </div>
    );
  }
}
 
const InvoicePrint = () => {
   const classes = useStyles()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <div >
      <ComponentToPrint ref={componentRef} />
   
    <div className={classes.printButton} >
    <Button variant="contained" color="primary" onClick={handlePrint}>
       Print
      </Button>
    
    </div>
  
      
    </div>
  );
};
export default InvoicePrint