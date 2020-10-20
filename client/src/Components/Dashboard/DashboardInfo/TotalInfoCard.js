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

const TotalInfoCard = ({title,data,info1,info2}) => {

  const info = data || {}
  const classes = useStyles();

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
          {title}
            </Typography>
            <Typography
              color="error"
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
         
        >
          <Typography
            color="info"
            variant="caption"
          >
              {info1} {info.totalProduct}
       
          </Typography>
        </Box>
        <Box
         
        >
          <Typography
            color="textPrimary"
            variant="caption"
          >
           {info2} {info.totalProductType}
          </Typography>
        </Box>
      
      
      </CardContent>
      </Paper>

  );
};



export default TotalInfoCard;