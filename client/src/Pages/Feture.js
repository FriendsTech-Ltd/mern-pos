import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import ShopIcon from '@material-ui/icons/Shop';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },

  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
      <div>
    <Grid item xs={12}>
    <Typography variant="h4" gutterBottom align="center" >
      Feature
      </Typography>
        </Grid>
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
       
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <ShopIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Product Management
            </Typography>
            <Typography>upload product</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
         
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <LoyaltyIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
             Sales Management
            </Typography>
            <Typography>craete invoice</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <GroupAddIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
             Customer Management
            </Typography>
            <Typography>save all customer details</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <MonetizationOnIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
             Accounting
            </Typography>
            <Typography>product price & customer due</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </div>
  );
}