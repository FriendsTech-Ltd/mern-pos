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
import { Button,TextField, Typography} from '@material-ui/core';
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
       display:'flex',
       padding: 5,
    },
    heading:{
      textAlign:"center",
    },
    details: {
      textAlign:"center",
      width: '60%'
    },
    account:{
   
    },

    content:{
       margin:8,
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
    
    }
  }))
 const CustomerDetails = (props) => {
  const { customer, getCustomer, getInvoice } = useContext(CustomerContext);
   const totalSell = customer.totalSell || []

   console.log(totalSell)
    const classes = useStyles()

    useEffect(() => {
      getCustomer(props.match.params.id);
      // eslint-disable-next-line
    }, []);
  


  
    const handleDelete= (_id) => {
      console.log(_id)
    }
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
      { columnName: 'viewDetails', filteringEnabled: false },
    ]);
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: '_id', title: 'Invoice Id' },
      { name: 'due', title: 'Invoice due' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'viewDetails', title: 'View details' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = totalSell.map((i,index) => {
      return {
        sl: index+1,
        _id: i._id,
        due:(i.due > 0 ? <Alert severity="error">৳{i.due}</Alert> : <Typography color='primary'>Paid</Typography>),
        createdAt:(moment( i.createdAt).format("MMMM Do YYYY")),
        viewDetails:( <Link className={classes.linkStyle}to='/dashboard/customer/invoice'><Button onClick={()=>getInvoice(i._id)} variant="contained" size="small" color="primary">
        View
      </Button> </Link>),
        action: (<div>
          <IconButton onClick={() => handleDelete(i._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 100 },
      { columnName: '_id', width: 300  },
      { columnName: 'due', width: 150  },
      { columnName: 'createdAt', width: 200  },
      { columnName: 'viewDetails', width: 200  },
      { columnName: 'action', width: 100 },
    ]);


    return (
      <div>
    
      {!totalSell.length ? (<div className={classes.spinner}>
        <CircularProgress size={80} />
        </div>)
         : (<div>
         <Paper variant="outlined" square className={classes.heading}>
         <h3>Customer details and all Invoice</h3>
      </Paper>
      <Paper variant="outlined" square className={classes.tittle}>
     
        <div className={classes.details}>
                    <p>Name: {customer.name}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Address: {customer.address}</p>
          </div>
        <div className={classes.account}>
        <Typography color='error'>Due: ৳{customer.due}</Typography>
        <Typography color='primary'>All Time Sell: ৳{customer.allTimeSellAmount}</Typography>
      
        <TextField
          size="small"
          variant="outlined"
          type="number"
          required
          label="Pay amount"
          name="pay"
         />
        <Button  variant="outlined" color="primary" >Pay due</Button>
      
          </div>
        
      </Paper >
           <Paper variant="outlined" elevation={5} className={classes.content}>
          
            <Grid
              rows={data}
              columns={columns}
            >
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              <VirtualTable height="500px" width='100%'/>
              
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
export default CustomerDetails;
