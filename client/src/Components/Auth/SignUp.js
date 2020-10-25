import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
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
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Navbar from '../layout/NavBar'
import Notification from '../common/Notification'

import AuthContext from '../../context/AuthContext/AuthContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  SignUp = (props) => {
  const authContext = useContext(AuthContext);
  const { register, serverMessage, success } = authContext;

  const classes = useStyles();

  const [formData, setFormData]=useState({
    companyName:"",
    companyOwner:"",
    email:"",
    phone:"",
    address:"",
    companyType:"",
    description:"",
    password:"",
    confirmPassword:""
});


const { companyName, companyOwner, email,phone,address, companyType, description, password, confirmPassword} = formData;

// useEffect(() => {
//   loadUser()
//   str = message.indexOf('complete')
//   if(str > -1){
//     props.history.push('/info');
//   }
//   // eslint-disable-next-line
// },[])

useEffect(() => {
  if(success){
    props.history.push('/info');
  }
  // eslint-disable-next-line
},[success])

const onSubmit = e => {
  e.preventDefault();

  register({ companyName,
    companyOwner,
    email,
    phone,
    address,
    companyType,
    description,
    password,
    confirmPassword
    
  });
  }
  
  const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 

return (
  <div>
    <Navbar/>

    <Container component="main" maxWidth="md">
    {serverMessage && <Notification severity='error' message={serverMessage}/> }
      <Paper elevation={5} >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={e=>onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                name="companyName"
                variant="outlined"
                required
                fullWidth
                label="Company Name"
                autoFocus
                value={companyName}
                onChange={e=> onChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                name="companyOwner"
                variant="outlined"
                required
                fullWidth
                label="Company Owner"
                autoFocus
                value={companyOwner}
                onChange={e=> onChange(e)}
              />
            </Grid>

        
            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                type="number"
                variant="outlined"
                required
                fullWidth
                label="Phone"
                name="phone"
                value={phone}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Address"
                name="address"
                value={address}
                onChange={e=> onChange(e)}
              />
            </Grid>
          

  
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}
        style={{width:"100%"}}
        size="small">
        <InputLabel id="demo-simple-select-outlined-label">Business Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Business Type"
          name="companyType"
          onChange={e=> onChange(e)}
          required
          
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value='electronic'>Electronic</MenuItem>
          <MenuItem value='mobile'>Mobile</MenuItem>
          <MenuItem value='grocery'>Grocery</MenuItem>
          <MenuItem value='hardware'>Hardware</MenuItem>
    
        </Select>
      </FormControl>
        </Grid>
            <Grid item xs={12}>
            <TextareaAutosize rows={6}
             style={{width:"100%"}}
            placeholder="Type something about your company"
            name="description"
            value={description}
            onChange={e=> onChange(e)}
            required
             />
            </Grid>
              <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={e=> onChange(e)}
              />
            </Grid>
        <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                onChange={e=> onChange(e)}
              />
            </Grid>


            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="This demo application,so your submitted data maybe deleted at anytime"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
      </Paper>
    </Container>
    </div>
  );
}

export default withRouter(SignUp)