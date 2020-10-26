import React, { useState,useEffect, useContext} from 'react';
import { withRouter, Link } from 'react-router-dom'
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  Paper,
  TextareaAutosize
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Notification from '../common/Notification'
import CustomerContext from '../../context/CustomerContext/CustomerContext'

const useStyles = makeStyles((theme) => ({
  buttonBar:{
   margin:0
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px'
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  backButton:{
    padding:5,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  EditCustomer = (props) => {

  const {editForm, updateCustomer, serverMessage,success,clearEditForm } = useContext(CustomerContext)

  const classes = useStyles();

  const [formData, setFormData]=useState({
    _id: editForm._id,
    name: editForm.name,
    phone: editForm.phone,
    email: editForm.email,
    address: editForm.address,
});

const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});}
const {_id, name,phone, email, address } = formData;
const updateData = email === "" ? {_id,name,phone,address} : {_id,name,phone,email, address} 

useEffect(() => {
  if(success){
    clearEditForm();
    props.history.push('/dashboard/customer');
  }
  // eslint-disable-next-line
},[success])

const onSubmit = e => {
  e.preventDefault();
  updateCustomer(updateData);
  }
  
return (
  <div>
  <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/customer' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
    </Paper > 
    <Container component="main" maxWidth="md">
    {serverMessage && <Notification severity="success" message={serverMessage}/> }
      <Paper elevation={5} >
      <CssBaseline />
    
      <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
          Update Customer
        </Typography>
        <form className={classes.form} onSubmit={e=>onSubmit(e)}>
          <Grid container spacing={2}>
  

           <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Customer Name"
                name="name"
                value={name}
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
                type="email"
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
            <TextareaAutosize rows={6}
             style={{width:"100%"}}
            placeholder="Customer Address details"
            name="address"
            value={address}
            onChange={e=> onChange(e)}
            required
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
         Update Customer
          </Button>
      
        </form>
      </div>
      <Box mt={5}>
      </Box>
      </Paper>
    </Container>
    </div>
  );
}

export default withRouter(EditCustomer)
