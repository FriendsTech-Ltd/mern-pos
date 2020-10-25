import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
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
        marginTop: theme.spacing(7),
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
      },
  }))
 const ChangePassword = () => {
  
  const {  changePassword, serverMessage} = useContext(AuthContext);

  const classes = useStyles();

  const [formData,setFormData]=useState({
   oldPassword:"",
   newPassword:"",
   confirmPassword:""
  });
const {oldPassword,newPassword,confirmPassword}=formData


const onChange = e => { setFormData({ ...formData,[e.target.name]:e.target.value }); }

const onSubmit = e =>{
  e.preventDefault();
  
  changePassword({oldPassword, newPassword,confirmPassword});
}

    return (
        <div>
        <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/me' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
              
           </Paper>
           <Paper variant="outlined" elevation={5} className={classes.content}>
          
<Container component="main" maxWidth="xs">
      { serverMessage && <Notification severity='error' message={serverMessage}/> }
      <Paper elevation={5}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Change Password
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <TextField
            size="small"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="oldPassword"
            value={oldPassword}
            onChange={e=> onChange(e)}
          />
            <TextField
            size="small"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label=" New Password"
            name="newPassword"
            value={newPassword}
            onChange={e=> onChange(e)}
          />
           <TextField
            size="small"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm New Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e=> onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
        </form>
      </div>
     
      </Paper>
    </Container>
           
           </Paper> 
        </div>
    )
}
export default ChangePassword;