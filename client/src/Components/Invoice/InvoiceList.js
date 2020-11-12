import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment'
import {Link} from 'react-router-dom'
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Table,
  TableHeaderRow,
  TableFilterRow,
  VirtualTable,
  Grid,
} from '@devexpress/dx-react-grid-material-ui';
 
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    middle:{
    margin:'auto',
    width:'100%'
},
  buttonBar: {
      display:'flex'
    },
  addButton:{
    padding:5,
    marginLeft: 'auto',
    },
    greenColor:{
      color:'green'
    },
  backButton:{
      padding:5,
    },
  content:{
      marginLeft:'2%',
      marginRight: '2%',
      width:'100%',
      flexGrow: 1,
       textAlign: 'center',
  overflow: 'auto',
    },
  linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
  spinner: {
      textAlign: 'center',
      marginTop:'17%'
    },
  

  }))
 const InvoiceList = () => {

  const { invoices, getInvoices,getInvoice, } = useContext(InvoiceContext);

    const classes = useStyles()

    useEffect(() => {
        getInvoices();
      // eslint-disable-next-line
    }, []);
  

    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: 'date', title: 'Date' },
      { name: 'customerName', title: 'Customer Name' },
      { name: 'totalAmount', title: 'Total Amount' },
      { name: 'payAmount', title: 'Pay Amount' },
      { name: 'due', title: 'Due' },
      { name: 'view', title: 'View', columnFilteringEnabled: false},
    ]);
   
    const data = invoices.map((invoice,index) => {
      return {
        sl: index+1,
        date: moment(invoice.createdAt).format("MMMM D YYYY"),
        customerName:invoice.customer.name,
        totalAmount: <Typography color='primary'>৳{invoice.totalAmountAfterDiscount}</Typography>,
        payAmount:<Typography className={classes.greenColor}>৳{invoice.payAmount}</Typography>,
        due: (invoice.due > 0? <Typography color="error">৳{invoice.due}</Typography> : <Typography className={classes.greenColor}>Paid</Typography> ),
        view:( <Link onClick={()=>getInvoice(invoice._id)} to={'/dashboard/invoice/single'}className={classes.linkStyle}><Button variant="contained" size="small" color="primary">
          View
        </Button> </Link>),
  
      }
    })

    return (
        <div>
          <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
                <div className={classes.addButton} >
                  <Link to ='/dashboard/invoice/create-invoice' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                      <AddIcon/>Create Invoice
                      </Button>
                </Link>
                </div>
                
           </Paper> 
      

     <div className={classes.middle}>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All Invoice here</h1>
            <Grid
              rows={data}
              columns={columns}
            >
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              <VirtualTable  height="auto"/>
          
              {/* <TableColumnResizing defaultColumnWidths={defaultColumnWidths} /> */}
              <TableHeaderRow headerStyle={ {position: 'fixed'} } />
              <TableFilterRow />
          
            </Grid>
          </Paper> 
          </div>
      
        </div>
    )
}
export default InvoiceList;
