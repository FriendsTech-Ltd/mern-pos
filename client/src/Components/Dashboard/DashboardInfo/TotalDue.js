import React from 'react';
import {
  Avatar,
  Paper,
  Box,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import  NumberWithComma from '../../../utils/NumberWithComma';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 30,
    width: 30
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalDue = ({totalDue}) => {
const classes = useStyles();
const {totalDueAmount} = totalDue;
const defaultValue = 0 ;


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
            color="textPrimary"
            gutterBottom
            variant="subtitle1"
          >
      Total Due Amount
          </Typography>
          <Typography
            color="error"
            variant="h5"
          >
            ৳{totalDueAmount ? NumberWithComma(totalDueAmount) : defaultValue }
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Typography
          color="textPrimary"
          variant="caption"
        >
         
        </Typography>
      </Box>
  
    
  
    </CardContent>
    </Paper>

  );
};



export default TotalDue;