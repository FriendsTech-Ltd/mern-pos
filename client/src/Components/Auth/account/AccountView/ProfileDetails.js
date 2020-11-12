import React, { useContext, useState } from 'react';
import AuthContext from '../../../../context/AuthContext/AuthContext'
import Notification from '../../../common/Notification'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  TextareaAutosize,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({user}) => {
  const classes = useStyles();

  const { updateUser, serverMessage } = useContext(AuthContext);
  const [formData, setFormData]=useState({
    _id: user._id,
    companyName: user.companyName,
    companyOwner: user.companyOwner,
    email: user.email,
    phone: user.phone,
    address: user.address,
    companyType: user.companyType,
    description: user.description,
});


const {_id, companyName, companyOwner, email,phone,address, companyType, description} = formData;


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
  }
  
  const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 
 

  return (
  
    <div>
        {serverMessage && <Notification severity='error' message={serverMessage}/> }
    <form className={classes.form} onSubmit={e=>onSubmit(e)}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            
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
          value={companyType}
          onChange={e=> onChange(e)}
          required
          
        >
         
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
         
      
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
       
      </Card>
      </form>
      </div>
  );
};


export default ProfileDetails;
