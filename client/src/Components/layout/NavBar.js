import React from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function NavBar() {
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  const linkStyle = {
    textDecoration: 'none',
    color: 'white'
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
    
          <Typography variant="h6" className={classes.title}>
            <Link style={linkStyle} to='/'>POS system</Link>
          </Typography>

          <Link style={linkStyle} to='/'><Button color="inherit">Sing In</Button></Link>
          <Link style={linkStyle} to='/register'><Button color="inherit">Sing Up</Button></Link>

        </Toolbar>
      </AppBar>
    </div>
    )
}
