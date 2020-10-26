import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
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
       paddingTop:'13%',
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
      marginTop:'15%'
    
    },
   
  }))
 const UpCoaming = () => {


    const classes = useStyles()

 

    return (
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
           </Paper > 

      <div>
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <Skeleton animation="wave" />
           <Typography variant="h3" gutterBottom>Up Coming Feature</Typography>
           <Typography variant="h5" gutterBottom>It’s not quite ready yet, but we are working hard to finish the development and it will be ready as soon as possible</Typography>
          
      <Skeleton animation="wave" />
          </Paper> 
        
        </div>

      
        </div>
    )
}
export default UpCoaming;
