import React from 'react';
import {
  Avatar,
  Paper,
  Box,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import  NumberWithComma from '../../../utils/NumberWithComma'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: 'green',
    height: 30,
    width: 30
  },
  differenceIcon: {
    color: 'green'
  },
  differenceValue: {
    color:'green',
    marginRight: theme.spacing(1)
  },
  color:{
    color:'green'
  }
}));

const Budget = ({saleInfo}) => {
  const classes = useStyles();

  const {totalSaleAmount,totalSoldProductQuantity,totalSoldInvoice  } = saleInfo
  const defaultValue = 0 

  return (
       <Paper variant='outlined'>
       <CardContent>
         <Grid
           container
           justify="space-between"
           spacing={2}
         >
           <Grid item>
             <Typography
               gutterBottom
               variant="subtitle1"
             >
         Total Sale Amount
             </Typography>
             <Typography
               className={classes.color}
               variant="h5"
             >
               ৳{totalSaleAmount ? NumberWithComma(totalSaleAmount) : defaultValue }
             </Typography>
           </Grid>
           <Grid item>
             <Avatar className={classes.avatar}>
               <MoneyIcon />
             </Avatar>
           </Grid>
         </Grid>
         <Box
          
         >
           <Typography
             variant="caption"
           >
             Total product sale <span className={classes.color}> {totalSoldProductQuantity ? totalSoldProductQuantity : defaultValue }</span>
            
           </Typography>
         </Box>
         <Box >
           <Typography
          variant="caption"
           >
            Total invoice <span className={classes.color}>{totalSoldInvoice ? totalSoldInvoice : defaultValue }</span>
           </Typography>
         </Box>
       
       
       </CardContent>
       </Paper>

  );
};



export default Budget;