import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import WebIcon from '@material-ui/icons/Web';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  card:{
textAlign:'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
   margin:'auto'
  },
  socialIcon:{
    textAlign:'center'
  }
}));

const AboutDeveloper=()=> {
  const classes = useStyles();

  return (
    <div>
       <Grid item xs={12}>
    <Typography variant="h4" gutterBottom align="center" >
      About Developer
      </Typography>
        </Grid>
       <Grid container spacing={3}>
        
       <Grid item xs={6} className={classes.card}>
        <Card >
      <CardActionArea>
      
      <Avatar alt="Remy Sharp" src="https://avatars1.githubusercontent.com/u/35170851?s=460&u=46f345829c076aa74976b2e516f063a86b728a27&v=4" className={classes.large}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Abd Naser.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Full Stack web application Developer(MERN stack).
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.socialIcon}>
      <FacebookIcon/>
      <LinkedInIcon/>
      <WebIcon/>  
     
      </div>
    </Card>
        
        </Grid>
        <Grid item xs={6} className={classes.card}>
        <Card >
      <CardActionArea>
      
      <Avatar alt="Remy Sharp" src="https://avatars3.githubusercontent.com/u/52525487?s=460&u=2cd18248d2efceecea869263a8fe90877d8b012e&v=4" className={classes.large}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Md.Shohedul.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Full Stack web application Developer(MERN stack).
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.socialIcon}>
      <FacebookIcon/>
      <LinkedInIcon/>
      <WebIcon/>  
     
      </div>
    </Card>
        
        </Grid>
      </Grid>
    </div>
  );
}
export default AboutDeveloper;