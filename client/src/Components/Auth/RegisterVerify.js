import React,{ useContext, useEffect} from 'react'
import {
  Grid,
  Box,
  makeStyles,
  Button,
} from '@material-ui/core';
import AuthContext from '../../context/AuthContext/AuthContext'
import Notification from '../common/Notification'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  content:{
    paddingTop:'18%',
  height: '50vh',

  },
  button:{
    
    textAlign:'center'
  }

 
}))

 const RegisterVerify = (props) => {

  const classes = useStyles();  
    const {verifyUser, isAuthenticated, serverMessage} =useContext(AuthContext)
    const token = props.match.params.token

    useEffect(() => {
        if(isAuthenticated){
          props.history.push('/dashboard');
        }
        // eslint-disable-next-line
      },[isAuthenticated])

    return (
        <div>
                { serverMessage && <Notification severity='error' message={serverMessage}/> }
          <Grid component="main" maxWidth="xs"  className={classes.content}>

      
     <Box justifyContent="center" className={classes.button}> 
     <Button
            
            onClick={()=>verifyUser(token)}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Confirm verification
          </Button>
     </Box> 
        
     
         </Grid>
            
        </div>
    )
}
export default RegisterVerify;