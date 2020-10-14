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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

  buttonBar: {
      display:'flex'
    },
  addButton:{
    padding:5,
    marginLeft: 'auto',
    },
  backButton:{
      padding:5,
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
    
    },

  }))
 const InvoiceList = () => {

  const { invoices, getInvoices,getInvoice } = useContext(InvoiceContext);

    const classes = useStyles()

    useEffect(() => {
        getInvoices();
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
      { name: 'name', title: 'Customer Name' },
      { name: 'due', title: 'Due' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'view', title: 'View' },

      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = invoices.map((invoice,index) => {
      return {
        sl: index+1,
        _id: invoice._id,
        name:invoice.customer.name,
        due:invoice.due,
        createdAt:invoice.createdAt,
        view:( <Link onClick={()=>getInvoice(invoice._id)} to={`/dashboard/invoice/${invoice._id}`}className={classes.linkStyle}><Button variant="contained" size="small" color="primary">
          View
        </Button> </Link>),
  
        action: (<div>
          <IconButton onClick={() => handleDelete(invoice._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 100 },
      { columnName: '_id', width: 220  },
      { columnName: 'name', width: 200  },
      { columnName: 'due', width: 100  },
      { columnName: 'createdAt', width: 200  },
      { columnName: 'view', width: 150  },
      { columnName: 'action', width: 100 },
    ]);


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
