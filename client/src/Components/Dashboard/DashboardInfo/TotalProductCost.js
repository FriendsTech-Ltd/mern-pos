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
import MoneyIcon from '@material-ui/icons/Money';

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

const TotalProductCost = ({productInfo}) => {

  const info = productInfo[0] || {}
  const classes = useStyles();

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
          COST
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              ৳{info.totalProductCost}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={1}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
           Total Product {info.totalProduct}
          </Typography>
        </Box>
        <Box
          mt={1}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
           Product Type {info.totalProductType}
          </Typography>
        </Box>
      
        {/* <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
      </Paper>

  );
};



export default TotalProductCost;