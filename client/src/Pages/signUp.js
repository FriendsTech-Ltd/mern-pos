import React,{useState} from 'react'
import { 
    FormGroup,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    FormHelperText,
    Input,
    Select,
    MenuItem,
    TextareaAutosize,
    spacing,
  } from '@material-ui/core';
    import './signUp.css'
export default function SignUp() {

  const [formData,setFormData]=useState({
    company_name:"",
    name:"",
    email:"",
    number:"",
    busness_type:"",
    description:"",
    password:"",
    confirm_password:""
});
const {company_name,name,email,number,busness_type,description,password,confirm_password}=formData
const onSubmit=e=>{
  e.preventDefault();
  console.log({company_name,name,email,number,busness_type,description,password,confirm_password})

  }

const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value}); }

    return (
        <div>
            <Grid container spacing={5} justify="center" direction="row" >
            <Grid item xs={8}
            container
            direction="column"
            justify="center"
            className="signup-form">
            <Paper
            variant="elevation"
            elevation={5}
            className="signup-background"
            >

          <Grid item>
          <form onSubmit={e=>onSubmit(e)}>
          <FormGroup>
          <FormControl>
              <InputLabel htmlFor="my-input">Company Name</InputLabel>
              <Input id="my-input" 
              name="company_name"
              value={company_name}
              onChange={e=> onChange(e)}
              />
          </FormControl>

          <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input id="my-input"
              name="name"
              value={name}
              onChange={e=> onChange(e)}
              />
          </FormControl>

          <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" 
              type="email"
              aria-describedby="my-helper-text" 
              name="email"
              value={email}
              onChange={e=> onChange(e)}
              />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl>
             <InputLabel htmlFor="my-input">Number</InputLabel>
             <Input id="my-input" 
             name="number"
             value={number}
             onChange={e=> onChange(e)}
             />
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Business Type:</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="busness_type"
             onChange={e=> onChange(e)}
              >
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="electronic">Electronic</MenuItem>
             </Select>
          </FormControl>


          <InputLabel id="demo-simple-select-label">Description</InputLabel>
          <FormControl >
            <TextareaAutosize id="my-input" 
            rowsMax={8}
            rows={8}
            aria-label="maximum height"
            name="description"
            value={description}
            onChange={e=> onChange(e)}
             />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input id="my-input" 
            name="password"
            value={password}
            onChange={e=> onChange(e)}
             />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Confirm Password</InputLabel>
            <Input id="my-input" 
            name="confirm_password"
            value={confirm_password}
            onChange={e=> onChange(e)}
            />
          </FormControl>


        <FormControl
        >
           <Button
            variant="contained"
            color="primary"
            type="submit"
            className="button-block"
            m={5}
            >
            Submit
            </Button>
        </FormControl>

    </FormGroup>
    </form>
        </Grid>
         </Paper>
        </Grid>
        </Grid>
   
        </div>
    )
}
