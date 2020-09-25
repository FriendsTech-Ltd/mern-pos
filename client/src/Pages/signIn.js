import React,{useState} from 'react'
import {
    Button,

    Grid,
    Paper,
    Typography,
    Link,
    FormControl,
    FormGroup,
    Input,
    InputLabel
    } from "@material-ui/core"
import './SignIn.css'
export default function SignIn() {
    
    const [email, setEmail] = useState('demoemail@gmail.com');
    const [password, setPassword] = useState('password');
    const onSubmit=e=>{
		e.preventDefault();
		console.log({email,password})
    }
    return (
        <div className="signinwarper">
      
        <Grid container spacing={0}  justify="center" direction="row">
       
        <Grid
        container
        xs={4}
        direction="column"
        justify="center"
        className="signin-form"
        >
        <Paper
        variant="elevation"
        elevation={5}
        className="signin-background"
        >
        <Grid item m={3}> 
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        </Grid>


        <Grid item>
        <form onSubmit={e=>onSubmit(e)}>
        <FormGroup>
      
            
        <FormControl>
  <InputLabel 
  htmlFor="my-input"
  >Email address</InputLabel>
  <Input 
  id="my-input" 
  aria-describedby="my-helper-text" 
  type="email"
  name="email"
  onChange={(event) =>
  setEmail({
  [event.target.name]: event.target.value,
  })
  }
required
  />
</FormControl>


<FormControl>
  <InputLabel 
  htmlFor="my-input">Password</InputLabel>
  <Input id="my-input" 
  aria-describedby="my-helper-text" 
  type="password"
  name="password"

  onChange={(event) =>
  setPassword({
  [event.target.name]: event.target.value,
  })
  }
required
  />
</FormControl>

<FormControl
pacing={3}>
    
<Button
        variant="contained"
        color="primary"
        type="submit"
        className="button-style"
        >
        Submit
        </Button>
</FormControl>
</FormGroup>
</form>
        

        </Grid>
        <Grid item>
        <Link href="#" variant="body2">
        Forgot Password?
        </Link>
        </Grid>
        </Paper>
        </Grid>
        </Grid>
   
        </div>
    )
}
