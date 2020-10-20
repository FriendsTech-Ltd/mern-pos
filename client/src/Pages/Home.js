import React from 'react';
import { Link } from 'react-router-dom'
import {Grid,CssBaseline, Button,Typography,Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Components/layout/NavBar'
import Feature from './Feture'
import WhyPos from './WhyPos'
import Qa from './QA';
import AboutDeveloper from './AboutDeveloper'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundImage: `url("https://cdn.wallpapersafari.com/16/15/LrxlKZ.jpg")`,
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(9, 0, 6),
    height:570,
    
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  feature:{
    paddingRight:200,
    paddingLeft:200,
    backgroundColor:'#badeee'
  },
  whyPos:{
    marginTop:20,
    paddingRight:200,
    paddingLeft:200
  }

}));


export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar/>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              POIN OF SALE
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
            Turn your Retail Small Business into a Customer Focused, Profit Generating Machine
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to='/register'className={classes.linkStyle}>
                  <Button variant="contained" color="primary">
                   START 14 DATYS TRIAL
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                <Link to='/login' className={classes.linkStyle}>
                  <Button variant="contained" color="primary">
                    DEMO
                  </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <div className={classes.feature} maxWidth="md">
          <Grid>
                <Feature/>
          </Grid>
        </div>


        <div className={classes.whyPos} maxWidth="md">
          <Grid>
         <WhyPos/>
          </Grid>
        </div>


        <Container className={classes.cardGrid} maxWidth="md">
    
          <Grid container spacing={4}>
         <Qa/>
          </Grid>
        </Container>
        <div className={classes.whyPos} maxWidth="md">
          <Grid>
         <AboutDeveloper/>
          </Grid>
        </div>
      </main>
   
     
    </React.Fragment>
  );
}