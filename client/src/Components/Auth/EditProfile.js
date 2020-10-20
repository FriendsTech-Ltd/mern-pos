import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import {
  Grid,
  Container,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Notification from '../common/Notification'

import AuthContext from '../../context/AuthContext/AuthContext'
const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
    },

  tittle: {
      display:'flex',
     padding:3
    },
  title:{
      textAlign:'center',
      padding:5
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
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
  submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))
 const EditProfile = (props) => {
  const authContext = useContext(AuthContext);

  const { editForm,clearEditForm, updateUser, serverMessage, success } = authContext;

  const classes = useStyles();

  const [formData, setFormData]=useState({
    companyName:"",
    companyOwner:"",
    phone:"",
    address:"",
    companyType:"",
    description:"",

});

useEffect(() => {
  setFormData({
    _id:editForm._id,
    companyName:editForm.companyName,
    companyOwner:editForm.companyOwner,
    phone:editForm.phone,
    address:editForm.address,
    companyType:editForm.companyType,
    description:editForm.description,
  })
}, [editForm])

const { _id, companyName, companyOwner,phone,address, companyType, description} = formData;

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
    props.history.push('/dashboard');
  }
  // eslint-disable-next-line
},[success])

const onSubmit = e => {
  e.preventDefault();

  updateUser({ 
    _id,
    companyName,
    companyOwner,
    phone,
    address,
    companyType,
    description,
  });
  clearEditForm()
  }
  
  const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 

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
          
           <Container component="main" maxWidth="md">
    {serverMessage && <Notification severity='error' message={serverMessage}/> }
     
      <CssBaseline />
      <div className={classes.paper}>
     
        <Typography component="h3" variant="h5" className={classes.title} >
          Edit Profile
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
          value={companyType}
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
          <MenuItem value='pharmacy'>Pharmacy</MenuItem>
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
            
    



          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           update Profile
          </Button>
  
        </form>
      </div>
     
    
    </Container>
         
              
             
           </Paper> 
        </div>
    )
}
export default withRouter(EditProfile);