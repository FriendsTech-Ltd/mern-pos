import React,{useContext,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Info from './DashboardInfo/index'
import FilterByDay from './DashboardInfoFilterByDay/FilterByDay'
import Chart from './Chart'
import RecentSale from './RecentSale'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  // dashboardInfoFilterByDay:{
  //   display: 'flex',
  // },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 294,
  },
  middle:{
    margin:'auto',
   
  },
  p:{
    paddingTop:1,
    paddingRight:6,
    paddingLeft:6,
    paddingBottom:1
  }
}));
const DashboardInfo = () => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
const {getRecentSale,recentSale} = useContext(InvoiceContext)

useEffect(()=>{
  getRecentSale()
  // eslint-disable-next-line
},[])

    return (
        <div>
          <Grid container spacing={2}>
               <Grid item  className={classes.middle} >
              <Paper className={classes.p}>
    
                <Info/>

              </Paper>
            </Grid>

           
         
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
         
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <FilterByDay/>
              </Paper>
            </Grid>
       
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <RecentSale  recentSale={recentSale}/>
              </Paper>
            </Grid>
          </Grid>
         
        </div>
    )
}
export default DashboardInfo;
