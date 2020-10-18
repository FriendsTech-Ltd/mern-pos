import React from 'react';
import {
  Avatar,
  Paper,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 40,
    width: 40
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({saleInfo}) => {
  const classes = useStyles();
  const info = saleInfo[0] || {}

  return (
    <Paper variant='outlined'>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Sales
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              ৳{info.totalSaleAmount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MonetizationOnIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            total product sale {info.totalProductSale}
          </Typography>
        </Box>
      </CardContent>
      </Paper>

  );
};



export default Budget;