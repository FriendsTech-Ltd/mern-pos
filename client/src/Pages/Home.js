import React from 'react';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from '../Components/layout/NavBar'
import Feature from './Feture'
import WhyPos from './WhyPos'
import Qa from './QA'


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height:550
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
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Turn your Retail Small Business into a Customer Focused, Profit Generating Machine
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                   START 14 DATYS TRIAL
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    DEMO
                  </Button>
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


        <Container className={classes.cardGrid} maxWidth="md">
        
          <Grid container spacing={4}>
         <WhyPos/>
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
    
          <Grid container spacing={4}>
         <Qa/>
          </Grid>
        </Container>
      </main>
   
     
    </React.Fragment>
  );
}