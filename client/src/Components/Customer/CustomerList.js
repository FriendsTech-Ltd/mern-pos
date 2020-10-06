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
 const CustomerList = () => {
  // const CustomerContext = useContext(CustomerContext);
  const { customers, getCustomers } = useContext(CustomerContext);

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
      { name: 'name', title: 'Product name' },
      { name: 'phone', title: 'Phone' },
      { name: 'email', title: 'Email' },
      { name: 'address', title: 'Address' },
      { name: 'due', title: 'Due' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'view', title: 'View' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = customers.map((c,index) => {
      return {
        sl: index+1,
        name: c.name,
        phone: c.phone,
        email:(c.email? c.email : <Alert severity="warning">Not Email</Alert> ),
        address: c.address,
        due: (c.due > 1? c.email : <Alert severity="info">No Due</Alert> ),
        createdAt:(moment( c.createdAt).format("MMMM Do YYYY")),
        view: (<Button variant="contained" size="small" color="primary" href="#contained-buttons">
        View
      </Button>),
        action: (<div>
          <IconButton onClick={() => handleEdit(c._id)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(c._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 50 },
      { columnName: 'name', width: 150  },
      { columnName: 'phone', width: 100 },
      { columnName: 'email', width: 150 },
      { columnName: 'address', width: 160 },
      { columnName: 'due', width: 160  },
      { columnName: 'createdAt', width: 150  },
      { columnName: 'view', width: 70  },
      { columnName: 'action', width: 120 },
    ]);
    // const [defaultColumnWidths] = useState([
    //   { columnName: 'sl', width: '10%' },
    //   { columnName: 'name', width: '10%'  },
    //   { columnName: 'phone', width: '10%' },
    //   { columnName: 'email', width: '15%' },
    //   { columnName: 'address', width: '20%' },
    //   { columnName: 'due', width: '10%' },
    //   { columnName: 'createdAt', width: '10%'  },
    //   { columnName: 'action', width: '15%' },
    // ]);

    return (
        <div>
             <Paper variant="outlined" square className={classes.tittle}>  
          <div className={classes.addButton}>
            <Link to ='/dashboard/add-customer' className={classes.linkStyle}>
                 <Button variant="contained" color="primary">
                 New Customer<AddIcon/>
                </Button>
          </Link>
          </div>
           </Paper > 

      {!customers.length ? (<div className={classes.spinner}>
        <CircularProgress size={80} />
        </div>)
         : (<div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All customer here</h1>
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
export default CustomerList;
