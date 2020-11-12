import React,{useContext} from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import AuthContext from '../../../../context/AuthContext/AuthContext'


const Account = () => {
 
  const {user} =useContext(AuthContext)
  return (
   
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user={user}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user={user}/>
          </Grid>
        </Grid>
      </Container>
   
  );
};

export default Account;
