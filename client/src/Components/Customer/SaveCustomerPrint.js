import React, { useRef } from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';
import { useReactToPrint } from 'react-to-print';
import CustomerInvoice from './CustomerInvoice'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  buttonBar: {
    padding: 7,
    marginLeft:19,
    marginRight:19,
    display:'flex'
  },
addButton:{

  marginLeft: 'auto',
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
         
            <CustomerInvoice/>
         
     
        </div>
    );
  }
}
 
const SaveInvoicePrint = () => {
   const classes = useStyles()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <div >
      <ComponentToPrint ref={componentRef} />
   
    <div >
        <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>
                      </Button>
                </Link>
                </div> 
                <div className={classes.addButton} >
                     <Button variant="contained" onClick={handlePrint} color="primary">
                      <PrintIcon/>
                      </Button>
                </div>

        </Paper>
  
    
    </div>
    </div>
  );
};
export default SaveInvoicePrint