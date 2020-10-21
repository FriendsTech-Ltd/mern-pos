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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

import CustomerContext from '../../context/CustomerContext/CustomerContext'

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      margin:5
    },
  buttonBar: {
       display:'flex',
    },
  heading:{
      textAlign:"center",
    },
  details: {
      textAlign:"center",
       width: '60%'
    },
  account:{
     padding:5,
     width: '30%'
    },
  backButton:{
      padding:5,
    },
  addButton:{
      padding:5,
      marginLeft: 'auto',
      },
  content:{
   display:'flex',
   padding:5
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
  const { getCustomer, customer,getInvoice } = useContext(CustomerContext);
   const totalSell = customer.totalSell || []

    const classes = useStyles()

    useEffect(() => {
      getCustomer(props.match.params.id);
      // eslint-disable-next-line
    }, []);
  


  
    const handleDelete= (_id) => {
      console.log(_id)
    }
    const [payDue,setPayDue]=useState(0)
    const onPay=(e)=>{
      setPayDue(e.target.value)
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
      <div className={classes.root}>
          <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/customer' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
                <div className={classes.addButton} >
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                      <EditIcon/>Edit Customer
                      </Button>
                </Link>
                </div>
    </Paper > 
    
      {!customer? (<div className={classes.spinner}>
        <CircularProgress size={80} />
        </div>)
         : (<div>
         <Paper variant="outlined" square className={classes.heading}>
         <h4>Customer details and all Invoice</h4>
      </Paper>
      <Paper variant="outlined" square className={classes.content}>
     
        <div className={classes.details}>
                    <Typography>Name: {customer.name}</Typography>
                    <Typography>Phone: {customer.phone}</Typography>
                    <Typography>Address: {customer.address}</Typography>
          </div>
        <div className={classes.account}>
        <Typography color='primary'>All Time Sell: ৳{customer.allTimeSellAmount}</Typography>
        {customer.due > 0 ? <Typography color='error'>Due: ৳{customer.due}</Typography> : <Typography color='primary'>No due</Typography>}
        
    
        {customer.due > 0 ? (<div>
            <TextField
            size="small"
            variant="outlined"
            type="number"
            required
            label="Pay amount"
            name="pay"
            />
          <Button  variant="outlined" onClick={(e)=>onPay(e)}color="primary" >Pay due</Button>
 </div>
        ) : (
          null

        )
        }
     
      
          </div>
        
      </Paper>

           <Paper variant="outlined" elevation={5} className={classes.table}>
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
