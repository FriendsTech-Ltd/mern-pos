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
import Notification from '../common/Notification'

import ProductContext from '../../context/ProductContext/ProductContext'

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

const  AddProduct = (props) => {

  const { uploadProduct, serverMessage, success } = useContext(ProductContext)

  const classes = useStyles();

  const [formData, setFormData]=useState({
    name:"",
    price: 0,
    sellingPrice:0,
    unit:"piece",
    stock:0,
    description:"",
    image:""
});

const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});} 
const upHandler=e=>{setFormData({...formData,[e.target.name]:e.target.files[0]})}

const { name, price, sellingPrice, unit, stock, description,image } = formData;


// useEffect(() => {
//   if(success){
//     props.history.push('/product');
//   }
//   // eslint-disable-next-line
// },[success])

const onSubmit = e => {
  e.preventDefault();

  uploadProduct({ 
    name,
    price,
    sellingPrice,
    unit,
    stock,
    description,
    image,
  });
  
  }
  


return (
  <div>

    <Container component="main" maxWidth="md">
    {serverMessage && <Notification severity='error' message={serverMessage}/> }
      <Paper elevation={5} >
      <CssBaseline />
      <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} onSubmit={e=>onSubmit(e)} encType="multipart/form-data" >
          <Grid container spacing={2}>
  

           <Grid item xs={12}>
              <TextField
                size="small"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
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
                label="Price"
                name="price"
                value={price}
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
                label="Selling Price"
                name="sellingPrice"
                value={sellingPrice}
                onChange={e=> onChange(e)}
              />
            </Grid>
          

  
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}
        style={{width:"100%"}}
        size="small">
        <InputLabel id="demo-simple-select-outlined-label">Unit</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Unit"
          name="unit"
          value={unit}
          onChange={e=> onChange(e)}
          required
          
        >
         
          <MenuItem value='piece'>piece</MenuItem>
          <MenuItem value='kg'>kg</MenuItem>
          <MenuItem value='litter'>Litter</MenuItem>
          <MenuItem value='pack'>Pack</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        <Grid item xs={12}>
              <TextField
                size="small"
                type="number"
                variant="outlined"
                required
                fullWidth
                name="stock"
                label="stock"
                type="stock"
                value={stock}
                onChange={e=> onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
            <TextareaAutosize rows={6}
             style={{width:"100%"}}
            placeholder="Type something about product"
            name="description"
            value={description}
            onChange={e=> onChange(e)}
            required
             />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                type="file"
                variant="outlined"
                required
                fullWidth
                label="Product Image"
                name="image"
                onChange={e=> upHandler(e)}
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
          upload Product
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

export default withRouter(AddProduct)