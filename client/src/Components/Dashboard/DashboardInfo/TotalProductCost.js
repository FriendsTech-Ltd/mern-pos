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
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import  NumberWithComma from '../../../utils/NumberWithComma'

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

const TotalProductCost = ({productInfo}) => {

const classes = useStyles();
const {totalProductCost, totalProduct, totalProductType } = productInfo
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
              color="textPrimary"
              gutterBottom
              variant="subtitle1"
            >
        Total Product Cost
            </Typography>
            <Typography
              color="error"
              variant="h5"
            >
              ৳{totalProductCost ? NumberWithComma(totalProductCost) : defaultValue}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <IndeterminateCheckBoxIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
         
        >
          <Typography
            color="textPrimary"
            variant="caption"
          >
           Total product in stock {totalProduct ? totalProduct : defaultValue}
          </Typography>
        </Box>
        <Box
         
        >
          <Typography
            color="textPrimary"
            variant="caption"
          >
           Product type {totalProductType ? totalProductType : defaultValue}
          </Typography>
        </Box>
      
      
      </CardContent>
      </Paper>

  );
};



export default TotalProductCost;