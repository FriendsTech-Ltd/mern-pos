import React from 'react'
import { Link } from 'react-router-dom'
import {
    Grid,
    AppBar,
    Typography,
    Toolbar,
    Button
    } from "@material-ui/core"
export default function NavBar() {
    return (
        <div>
       <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
     
        <Grid item>
        <Typography variant="h6" color="inherit">
     Friends-teck
    </Typography>
        </Grid>
      
        <Link to="/signin">
        <Button>Sign In</Button>
        </Link>
        <Link to="/signup">
        <Button>Sign Up</Button>
        </Link>
       
        </Toolbar>
        </AppBar>
        </div>
    )
}
