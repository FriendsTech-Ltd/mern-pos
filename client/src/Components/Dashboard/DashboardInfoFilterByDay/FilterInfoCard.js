import React from 'react'
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
  
const FilterInfoCard = ({title,data}) => {
    const classes = useStyles();
    return (

             <Paper variant='outlined'>
                <CardContent>
                <Grid
          container
          justify="space-between"
          spacing={1}
        >
          <Grid item>
            <Typography
              gutterBottom
            
            >
              {title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {data}
            </Typography>
          </Grid>
      
        </Grid>
                    
                </CardContent>
             </Paper>
           
    )
}
export default FilterInfoCard

