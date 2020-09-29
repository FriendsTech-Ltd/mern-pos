import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Grid,Box,Container, Avatar,Typography,makeStyles, Button,CssBaseline,TextField,FormControlLabel,Checkbox,Paper} from '@material-ui/core';
import Navbar from '../layout/NavBar'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function SignIn() {
  const classes = useStyles();

  const [formData,setFormData]=useState({
    email:"",
    password:"",
 
});
const {email,password}=formData

const onSubmit=e=>{
e.preventDefault();
console.log({email, password});
}


const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});}

  return (
    <div>
    <Navbar/>
    <Container component="main" maxWidth="xs">
     <Paper elevation={5}>
     <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e=>onSubmit(e)}>
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
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