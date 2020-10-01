import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Grid} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    tittle: {
      height: 60,
      padding:0,
      margin:0
    },
    addButton:{
      paddingTop:10,
      marginRight:8,
      direction: 'rtl',
    },
    link:{
      
    },
    content:{
       margin:10,
       flexGrow: 1,
    height: '77vh',
    overflow: 'auto',
    },
    linkStyle:{
      textDecoration: 'none',
      color: 'white'
    }
  }))
 const CustomerList = () => {
    const classes = useStyles()
    return (
        <div>
        <Paper variant="outlined" square className={classes.tittle}>  
          <Grid className={classes.addButton}>
            <Link to ='/dashboard/add-customer' className={classes.linkStyle}>
                 <Button variant="contained" color="primary">
                 New Customer<AddIcon/>
                </Button>
          </Link>
          </Grid>
           </Paper > 
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All customer here</h1>
           </Paper> 
        </div>
    )
}
export default CustomerList;