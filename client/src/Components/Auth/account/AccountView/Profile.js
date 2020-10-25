import React from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  middleItem:{
    textAlign:'center',
    margin:'auto'
  }
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  

  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={`/public/${user.companyLogo}`}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.companyName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.companyOwner}
          </Typography> 
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.email}
          </Typography> 
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.phone}
          </Typography>

           <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.address}
          </Typography> 
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
           Member since: {moment(user.createdAt).format("dddd, MMMM  YYYY")}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={()=>alert('You can\'t upload. We will fix this issue as soon as possible')}
        >
          Upload picture
        </Button>
      </CardActions>
      <Divider />
      <CardActions className={classes.middleItem}>
      <Link to='/dashboard/change-password' className={classes.linkStyle}>
   <Button variant="outlined" size="small" color="secondary">Change Password</Button>
 </Link>

 <Link to='/dashboard/delete-account' className={classes.linkStyle}>
   <Button variant="outlined" size="small" color="secondary">Delete Account</Button>
 </Link>
 </CardActions>
    </Card>
  );
};


export default Profile;


