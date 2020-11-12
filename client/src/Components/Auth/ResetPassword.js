import React,{useContext,useState,useEffect} from 'react'
import { withRouter, Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Grid,
  Container,
  Avatar,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  Paper} from '@material-ui/core';
import Notification from '../common/Notification';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
    },
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px'
      },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
      }
  }))
 const ResetPassword = (props) => {
    const token = props.match.params.token
   const { resetPassword, serverMessage,isAuthenticated} = useContext(AuthContext);
   const classes = useStyles();
 

   useEffect(() => {
    if(isAuthenticated){
      props.history.push('/dashboard');
    }
    // eslint-disable-next-line
  },[isAuthenticated])


const [newPassword,setPassword]=useState('');
const [confirmPassword,setConfirmPassword]=useState('');


 const onSubmit = e =>{
   e.preventDefault();
 
   resetPassword({newPassword,confirmPassword,token})
 } 
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
             <Grid className={classes.details}>
<Container component="main" maxWidth="xs">
      { serverMessage && <Notification severity='error' message={serverMessage}/> }
      <Paper elevation={5}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Reset Password
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <TextField
            size="small"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
            <TextField
            size="small"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           submit
          </Button>
        </form>
      </div>
     
      </Paper>
</Container>
            </Grid>
           </Paper> 
        </div>
    )
}
export default withRouter(ResetPassword);