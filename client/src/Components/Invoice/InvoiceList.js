import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
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
  TableColumnResizing,
  Grid,
} from '@devexpress/dx-react-grid-material-ui';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

import AddIcon from '@material-ui/icons/Add';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import CustomerContext from '../../context/CustomerContext/CustomerContext'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    tittle: {
      height: 60,
      padding:0,
      margin:0
    },
    addButton:{
      paddingTop:10,
      marginRight:8,
      direction: 'rtl',
    },
    link:{
      
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
    spinner: {
      textAlign: 'center',
      marginTop:'17%'
    
    }
  }))
 const InvoiceList = () => {
  // const CustomerContext = useContext(CustomerContext);
  const { invoices, getInvoice } = useContext(CustomerContext);

    const classes = useStyles()

    useEffect(() => {
      getCustomers();
      // eslint-disable-next-line
    }, []);
  


    const handleEdit = (_id) => {
      console.log(_id)
    }
  
    const handleDelete= (_id) => {
      console.log(_id)
    }
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: '_id', title: 'Invoice Id' },
      { name: 'view', title: 'View' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = invoices.map((invoice,index) => {
      return {
        sl: index+1,
        _id: i._id,
        view:( <Link to={`/dashboard/${invoice._id}`}><Button variant="invoiceontained" size="small" invoiceolor="primary">
          View
        </Button> </Link>),
  
        action: (<div>
          <IconButton onClick={() => handleEdit(invoice._id)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(invoice._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 50 },
      { columnName: '_id', width: 150  },
      { columnName: 'view', width: 70  },
      { columnName: 'action', width: 120 },
    ]);


    return (
        <div>
             <Paper variant="outlined" square className={classes.tittle}>  
          <div className={classes.addButton}>
            <Link to ='/dashboard/create-invoice' className={classes.linkStyle}>
                 <Button variant="contained" color="primary">
                Create Invoice<AddIcon/>
                </Button>
          </Link>
          </div>
           </Paper > 

      {!invoices.length ? (<div className={classes.spinner}>
        <CircularProgress size={80} />
        </div>)
         : (<div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All Invoice here</h1>
            <Grid
              rows={data}
              columns={columns}
            >
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              <VirtualTable height="auto"/>
              
              <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
              <TableHeaderRow />
              <TableFilterRow />
          
            </Grid>
          </Paper> 
          </div>

         )
        }
      
        </div>
    )
}
export default InvoiceList;
