import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'
import { Button} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AuthContext from '../../context/AuthContext/AuthContext'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
main:{
  padding:15,
  
},
  header:{
  textAlign:'center',
  height:45,
  padding:8
},
  tittle: {
  height: 60,
  padding:0,
  margin:0
},
backButton:{
  padding:5,
},
details:{
  textAlign:'center',
  padding:8
},
  account:{
  padding:15,
  direction: 'rtl',
},
linkStyle:{
  textDecoration: 'none',
  color: 'white'
},
spinner: {
  textAlign: 'center',
  marginTop:'17%'

},
table: {
    minWidth: 650,
  },
}))


  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

 const InvoiceComponent = ({invoiceItem, invoiceAccount, totalPrice,}) => {
  const {user} =useContext(AuthContext)
  const customer = invoiceAccount.customer
    const classes = useStyles()
    return (
        <div>
        <Paper variant="outlined" square  className={classes.tittle}> 
                        <div className={classes.backButton}>
                        <Link to ='/dashboard' className={classes.linkStyle}>
                            <Button variant="contained" color="primary">
                          <ArrowBackIosIcon/>Back
                            </Button>
                      </Link>
                      </div> 
          </Paper > 
      
            {!invoiceItem.length ? (<div className={classes.spinner}>
              <CircularProgress size={80} />
              </div>)
               : (<div className={classes.main}>
                 <Paper variant="outlined" square className={classes.header}>
                  <Grid container spacing={3}>
                      <Grid item xs={4}>
                      <Typography>Invoice Id: {invoiceAccount._id} </Typography>
                  
                      </Grid>
                      <Grid item xs={4}>
                      <Typography>Date: {moment( invoiceAccount.createdAt).format("Do MMMM YYYY, h:mm:ss a")}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                      <Typography>Status: Delivered</Typography>
                      </Grid>
                  </Grid>
                 </Paper>
                 <Paper variant="outlined" square className={classes.details}>
                  <Grid container spacing={3}>
                      <Grid item xs={6}>
                      <Typography>From: </Typography>
                      <Typography>{user.companyName} </Typography>
                      <Typography>Owner:  {user.companyOwner} </Typography>
                      <Typography>Address: {user.address}</Typography>
                     <Typography>Email: {user.email}</Typography> 
                      <Typography>Phone: {user.phone} </Typography>
                      </Grid>
        
                      <Grid item xs={6}>
                      <Typography>To: </Typography>
                      <Typography>Customer Name :{customer.name} </Typography>
                      <Typography>Address:{customer.address} </Typography>
                      <Typography>Email: </Typography> 
                      <Typography>Phone:{customer.phone} </Typography>
                      {customer.due > 0 ? (<Typography color='error'>Due: ৳{customer.due} </Typography>) : (<Typography color='primary'>No Due </Typography>)}
                      
                      </Grid>
                  </Grid>
                 </Paper>
                 <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl</TableCell>
                  <TableCell align="right">Product Name</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceItem.map((product,index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index+1}
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">৳{product.sellingPrice}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">৳{product.sellingPrice*product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper variant="outlined" elevation={3} className={classes.account} >
                <Typography>Sub total : ৳{totalPrice}</Typography>
                <Typography>Total amount after {invoiceAccount.discount}% discount : ৳{invoiceAccount.totalAmountAfterDiscount}</Typography>
                <Typography>Pay amount : ৳{invoiceAccount.payAmount} </Typography>
                {invoiceAccount.due > 0 ? (<Typography color='error'>Due: ৳{invoiceAccount.due} </Typography>) : (<Typography color='primary'>Paid</Typography>)}
          </Paper>
                </div>
      
               )
              }
            
              </div>
    )
}
export default InvoiceComponent;