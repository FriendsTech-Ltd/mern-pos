import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import Notification from '../common/Notification'
import AuthContext from '../../context/AuthContext/AuthContext'

import { Button,Paper,makeStyles,Typography, Grid,TextField,Box,Container} from '@material-ui/core';
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
    contentColor:{
      color:"red"
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
 const DeleteAccount = () => {


  const classes = useStyles()
  const {deleteUser, serverMessage} = useContext(AuthContext)
  const [password,setPassword]= useState("")
  const onDelete = ()=>{
  deleteUser({password})
}
    return (
        <div>
            {serverMessage && <Notification severity='error' message={serverMessage}/> }
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/me' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
           </Paper > 

      <div>
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <Typography variant="h4" gutterBottom className={classes.contentColor}>Are you sur you want to delete you account</Typography>
           <Typography variant="h6" gutterBottom className={classes.contentColor}>All your data will be lost and not be recovered at any data </Typography>
           <Container component="main" maxWidth="xs">
             <Grid>
             <TextField
            size="small"
            color="error"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          
             <Box
          p={2}
        >
          <Button
          type="submit"
          variant="outlined" 
          color="secondary"
          onClick={onDelete}
          >
            Delete Confirm
          </Button>
        </Box>
        </Grid>
           </Container>
          </Paper> 
        
        </div>

      
        </div>
    )
}
export default DeleteAccount;
