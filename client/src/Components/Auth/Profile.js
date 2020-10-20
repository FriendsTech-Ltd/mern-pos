import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import {Typography, Grid,Box} from '@material-ui/core';
import AuthContext from '../../context/AuthContext/AuthContext'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
    tittle: {
    display:'flex',
    padding:3
  },
  addButton:{
    paddingTop:10,
    marginRight:8,
    direction: 'rtl',
  },
  backButton:{
    padding:5,
  },
  addButton:{
    padding:5,
    marginLeft: 'auto',
    },
  content:{
      margin:10,
      flexGrow: 1,
  height: '77vh',
  overflow: 'auto',
  },
  details:{
  textAlign:'center',
  paddingTop:'10%'
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  }
}))
 const Profile = () => {
   const {user,editFormFun} =useContext(AuthContext)
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
                <div className={classes.addButton} >
                  <Link onClick={()=>editFormFun(user)}to ='/dashboard/edit-profile' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                      <EditIcon/>Edit Profile
                      </Button>
                </Link>
                </div>
           </Paper>

           <Paper variant="outlined" elevation={5} className={classes.content}>
             <Grid className={classes.details}>
               <Typography>{user.companyName} </Typography>
               <Typography>Email: {user.email}</Typography> 
               <Typography>Phone: {user.phone}</Typography> 
                <Typography>Address:{user.address}</Typography>
                <Typography>Owner:  {user.companyOwner} </Typography>
             
                <Link to='/dashboard/change-password' className={classes.linkStyle}>
                  <Button variant="outlined" color="secondary">Change Password</Button>
                </Link>
             </Grid>
           </Paper> 
        </div>
    )
}
export default Profile;