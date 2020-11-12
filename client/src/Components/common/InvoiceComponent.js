import React, { useContext} from 'react'
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
  height:60,
  paddingTop:8,
  paddingBottom:20
},
  tittle: {
  height: 60,
  padding:0,
  margin:0
},

details:{
  textAlign:'center',
  padding:8
},
  account:{
  padding:15,
  direction: 'rtl',
},

spinner: {
  textAlign: 'center',
  marginTop:'17%'

},
table: {
    minWidth: 650,
  },
  signature:{
    textAlign:'center',
    paddingTop:'5%'
  }
}))



 const InvoiceComponent = ({invoiceItem, invoiceAccount, totalPrice,}) => {
  const classes = useStyles()
  const {user} =useContext(AuthContext)
  const customer = invoiceAccount.customer
  
    return (
        <div>
       
      
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
                    
                      <Typography><b>{user.companyName}</b> </Typography>
                      <Typography>Owner:  {user.companyOwner} </Typography>
                      <Typography>Address: {user.address}</Typography>
                     <Typography>Email: {user.email}</Typography> 
                      <Typography>Phone: {user.phone} </Typography>
                      </Grid>
        
                      <Grid item xs={6}>
                      <Typography>To: </Typography>
                    
                      <Typography><b>{customer.name}</b> </Typography>
                      <Typography>Address: {customer.address} </Typography>
                      <Typography>Email: {customer.email}</Typography> 
                      <Typography>Phone: {customer.phone} </Typography>
                      {customer.due > 0 ? (<Typography color='error'>Due: ৳{customer.due} </Typography>) : (<Typography color='primary'>No Due </Typography>)}
                      
                      </Grid>
                  </Grid>
                 </Paper>
                 <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceItem.map((product,index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index+1}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>৳{product.sellingPrice}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>৳{product.sellingPrice*product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper variant="outlined" elevation={3} className={classes.account} >
                <Typography>Sub total : ৳{totalPrice}</Typography>
                <Typography>Total amount after {invoiceAccount.discount}% discount : ৳{invoiceAccount.totalAmountAfterDiscount}</Typography>
                <Typography>Paid : ৳{invoiceAccount.payAmount} </Typography>
                {invoiceAccount.due > 0 ? (<Typography color='error'>Due: ৳{invoiceAccount.due} </Typography>) : (<Typography color='primary'>Paid</Typography>)}
          </Paper>
          <Grid className={classes.signature}>
            <Typography>**This is computer generated invoice,no signature required**</Typography>
          </Grid>
                </div>
      
               )
              }
            
              </div>
    )
}
export default InvoiceComponent;