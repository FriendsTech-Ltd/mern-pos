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
    backgroundColor: 'green',
    height: 30,
    width: 30
  },
  differenceIcon: {
    color: 'green'
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  },
  color:{
    color:'green'
  }
}));

const Budget = (props) => {
  const classes = useStyles();
  const {totalProfit} = props.totalProfit
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
      Total Profit Amount
          </Typography>
          <Typography
             variant="h5"
            className={classes.color}
          >
            ৳{totalProfit ? NumberWithComma(totalProfit) : defaultValue }
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



export default Budget;