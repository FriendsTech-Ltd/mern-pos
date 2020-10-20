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

import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor:'#01579b',
    height: 30,
    width: 30
  },
  differenceIcon: {
    color:'#01579b'
  },
  differenceValue: {
    color: '#01579b',
    marginRight: theme.spacing(1)
  },
  color:{
    color:'#01579b'
  }
  
}));

const TotalCustomer = ({totalCustomer}) => {
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
  Total Customer
      </Typography>
      <Typography
          variant="h5"
        className={classes.color}
      >
        {totalCustomer}
      </Typography>
    </Grid>
    <Grid item>
      <Avatar className={classes.avatar}>
        <PeopleIcon />
      </Avatar>
    </Grid>
  </Grid>
  <Box mt={5}
   
  >
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



export default TotalCustomer;