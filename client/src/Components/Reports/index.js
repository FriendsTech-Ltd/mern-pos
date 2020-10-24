import React from 'react'
import {Link} from 'react-router-dom'

import { Button,Paper,makeStyles,Typography} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    tittle: {
      height: 60,
      padding:0,
      margin:0,
      display:'flex'
    },
  backButton:{
      padding:5,
    },

    content:{
       margin:8,
       flexGrow: 1,
       textAlign: 'center',
    height: '77vh',
    overflow: 'auto',
    },
    linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
    spinner: {
      textAlign: 'center',
      marginTop:'17%'
    
    },
   
  }))
 const Index = () => {


    const classes = useStyles()

 

    return (
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/product' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
           </Paper > 

      <div>
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <Typography variant="h3" gutterBottom>Up Coaming Feature</Typography>
          </Paper> 
        </div>

      
        </div>
    )
}
export default Index;
