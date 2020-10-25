import React,{ useContext, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Navbar from '../layout/NavBar'
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper} from '@material-ui/core';

import Notification from '../common/Notification';

import AuthContext from '../../context/AuthContext/AuthContext';

const useStyles = makeStyles((theme) => ({
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
}));

const DemoLogIn = (props) =>  {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated,loadUser, serverMessage} = authContext;

  const classes = useStyles();

  const [formData,setFormData]=useState({
    email:"shohedul2524@gmail.com",
    password:"******",
  });

const {email}=formData
const password  = 'naser&emon'
useEffect(() => {
  loadUser();
  if(isAuthenticated){
    props.history.push('/dashboard');
  }
  // eslint-disable-next-line
},[isAuthenticated])

const onSubmit = e =>{
  e.preventDefault();
  login({email, password});
}

const onChange = e => { setFormData({ ...formData,[e.target.name]:e.target.value }); }

  return (
    <div>
    <Navbar/>
    <Container component="main" maxWidth="xs">
      { serverMessage && <Notification severity='error' message={serverMessage}/> }
      <Paper elevation={5}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Demo sign in
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <TextField
            size="small"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={email}
            onChange={e=> onChange(e)}
            disabled
          />
           <TextField
            size="small"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            value={password}
            onChange={e=> onChange(e)}
            disabled
          />
        
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Demo Sign In
          </Button>
          <Grid container>
            <Grid item xs>
                <Link>
              <span onClick={()=>alert('You can\'t forgot request because this is demo')}>Forgot password?</span>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
      </Paper>
    </Container>
    </div>
  );
}
export default withRouter(DemoLogIn);