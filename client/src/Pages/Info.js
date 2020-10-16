import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import {
makeStyles,
Button,
Paper} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AuthContext from '../context/AuthContext/AuthContext'
const useStyles = makeStyles((theme) => ({

  tittle: {
    display:'flex',
   padding:3
  },

  backButton:{
    padding:5,
  },
  content:{
     margin:10,
     flexGrow: 1,
  height: '79vh',
  overflow: 'auto',
  },
  
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '25px'
    },
}))

const Info = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { serverMessage} = authContext;

  return (
    <div>
        <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
              
           </Paper>
       <Paper variant="outlined" elevation={5} className={classes.content}>
      <h1>{serverMessage}</h1>
      </Paper>
    </div>
  )
}

export default Info;