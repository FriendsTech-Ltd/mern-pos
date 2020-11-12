import React, { useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, Typography,Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CustomerContext from '../../context/CustomerContext/CustomerContext'
import Notification from '../common/Notification'
import InvoiceTable from './InvoiceTable'
import PayHistory from './PayHistory';
import PayDue from './PayDue'
const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      margin:5,
      padding:5
    },
    customerInfo:{
      padding:5,
      textAlign:'center'
    },
    payHistoryStyle:{
      height:210,
      width:'200',
      overflow:'scroll'
    },
  buttonBar: {
       display:'flex',
    },
  heading:{
      textAlign:"center",
      height:50
    },
 

  backButton:{
      padding:5,
    },
  addButton:{
      padding:5,
      marginLeft: 'auto',
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
 const CustomerDetails = (props) => {
  const classes = useStyles()
  const { getCustomer, customer,serverMessage } = useContext(CustomerContext);
  const totalSell = customer.totalSell || []
  const DuePayHistory = customer.duePayHistory || []
  

    useEffect(() => {
      getCustomer(props.match.params.id);
      // eslint-disable-next-line
    }, []);
  
    return (
      <div className={classes.root}>
          {serverMessage && <Notification severity='error' message={serverMessage}/> }
 <Grid>
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
      </Grid>

       {!customer? (<div className={classes.spinner}>
        <CircularProgress size={80} />
         </div>)
         : (
           <div>
   <Paper variant="outlined" square className={classes.heading}>
       <h4>Customer details and all Invoice</h4>
       </Paper>
       {/* <Paper variant="outlined" elevation={5} className={classes.customerInfo}> */}
      <Grid container spacing={1} className={classes.customerInfo} >
       
          <Grid item lg={3} xl={3}>
          <Typography>Name: {customer.name}</Typography>
           <Typography>Phone: {customer.phone}</Typography>
           <Typography>Address: {customer.email}</Typography>
            <Typography>Address: {customer.address}</Typography>
          </Grid>

            <Grid item lg={3} xl={3} >
          <Typography color='primary'>All Time Sell: ৳{customer.allTimeSellAmount}</Typography>
         {customer.due > 0 ? <Typography color='error'>Due: ৳{customer.due}</Typography> : <Typography color='primary'>No due</Typography>}
         {customer.due > 0 ? <PayDue customerId={customer._id}/>  : (null) }
            </Grid>

              <Grid item lg={6} xl={6} className={classes.payHistoryStyle}>
             
                {!DuePayHistory.length ? (
                <Typography>No Pay History</Typography>
              ) : (
                <PayHistory payHistory={DuePayHistory}/>
               ) }
             
             
              </Grid>
          
      </Grid>
      {/* </Paper> */}
      <Grid>
        <Paper variant="outlined" elevation={5} className={classes.table}>
           <InvoiceTable totalSell={totalSell}/>
          </Paper>
      </Grid>
           </div>
         )
       }
    


    </div>
   
    )
}
export default CustomerDetails;
