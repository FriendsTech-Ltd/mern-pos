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
 const ForgotPassword = (props) => {
 
   const { forgoRequest, serverMessage,success} = useContext(AuthContext);
   const classes = useStyles();
 
   useEffect(() => {
    if(success){
      props.history.push('/info');
    }
    // eslint-disable-next-line
  },[success])

const [email,setEmail]=useState('');

 const onSubmit = e =>{
   e.preventDefault();
   forgoRequest({email})
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
         Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <TextField
            size="small"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="email"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
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
export default withRouter(ForgotPassword);