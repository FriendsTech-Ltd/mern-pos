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
        margin:8,
        flexGrow: 1,
    },
    titleContent: {
     padding: 10,
     textAlign: 'center',
    },

    link:{
      
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
  // const CustomerContext = useContext(CustomerContext);
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
    ]);
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: '_id', title: 'invoice Id' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'viewDetails', title: 'View details' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = totalSell.map((i,index) => {
      return {
        sl: index+1,
        _id: i._id,
        createdAt:(moment( i.createdAt).format("MMMM Do YYYY")),
        viewDetails:( <Link to='/dashboard/customer/invoice'><Button onClick={()=>getInvoice(i._id)} variant="contained" size="small" color="primary">
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
      { columnName: 'createdAt', width: 300  },
      { columnName: 'viewDetails', width: 250  },
      { columnName: 'action', width: 100 },
    ]);


    return (
        <div>
             <Paper variant="outlined" square className={classes.tittle}>  
          <div className={classes.titleContent}>
              <h1>customer details </h1>
               <p>Name: {customer.name}</p>
               <p>Phone: {customer.phone}</p>
               {/* <p>Email: {customer.email}</p> */}
               <p>Address: {customer.address}</p>
       
          </div>
           </Paper > 

      {!totalSell.length ? (<div className={classes.spinner}>
        <CircularProgress size={80} />
        </div>)
         : (<div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>customer invoice</h1>
            <Grid
              rows={data}
              columns={columns}
            >
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              <VirtualTable height="500px"/>
              
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
