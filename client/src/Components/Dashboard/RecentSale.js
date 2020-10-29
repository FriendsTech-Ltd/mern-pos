import React from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(2),
  },
  spinner: {
    textAlign: 'center',
    padding:100

  }
}));

const RecentSale=({recentSale})=>{
  const classes = useStyles();
  return (
    <React.Fragment>

{!recentSale.length ? (<div className={classes.spinner}>
        <Typography>No recent sale</Typography>
        </div>)
         : (<div>

      <Title>Recent Sales</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Pay amount</TableCell>
            <TableCell>Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentSale.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{(moment(row.createdAt).format("MMMM Do YYYY"))}</TableCell>
          <TableCell>{row.customer.name}</TableCell>
              <TableCell>{row.totalAmountAfterDiscount}</TableCell>
              <TableCell>{row.payAmount}</TableCell>
              <TableCell align="right">{row.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to ="/dashboard/invoice/invoice-list" color="primary" >
          See more sale
        </Link>
      </div>
      </div>)
 }
    </React.Fragment>
  );
}

export default RecentSale