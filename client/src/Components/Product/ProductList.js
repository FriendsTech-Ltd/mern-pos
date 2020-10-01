import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))
 const ProductList = () => {
    const classes = useStyles()
    return (
        <div>
              <Paper> 
           <Grid container spacing={3}>
           <Grid item xs={6} sm={3}>
         
        </Grid>
        <Grid item xs={6} sm={3}>
         
        </Grid>
        <Grid item xs={6} sm={3}>
          
        </Grid>
        <Grid item xs={6} sm={3}>
            <Button variant="contained" color="primary" href="#contained-buttons">
        Add New
      </Button>
        </Grid>
           </Grid>
           </Paper> 

       
           <h1>All product here</h1>
        
          
           
        </div>
    )
}
export default ProductList;