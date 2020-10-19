import React,{useContext,useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Paper
} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterInfoCard from './FilterInfoCard'
import InvoiceContext from '../../../context/InvoiceContext/InvoiceContext'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    paper:{
     paddingTop:10,
     paddingBottom:10
    },
    selectMenu:{
     textAlign:'center',
     paddingBottom:3
    }
  }));
 const Index = () => {
    const classes = useStyles();
    const {getSaleInfoByDay,recentSaleByDay,} =useContext(InvoiceContext);




const [day, setDay] = React.useState(1);

useEffect(()=>{
  getSaleInfoByDay(day)
},[day]);

const handleClick = (e) => {
  setDay(e.target.value)

};
const {totalProductCost,totalProfit,totalSaleAmount,totalSoldProduct}  = recentSaleByDay || {}
  
return (
        <Paper variant='outlined' className={classes.paper}>
            

              <Container>
                <Grid className={classes.selectMenu}>
              <FormControl variant="outlined"  style={{width:'300px'}} size="small" >
        <InputLabel htmlFor="outlined-age-native-simple">Sale Information Filter By Days</InputLabel>
        <Select
          native
          name="day"
          
          value={day}
          onChange={(e)=>handleClick(e)}
          label="Sale Information Filter By Days"
        >
        
          <option value={1}>Today</option>
          <option value={7}>Last week</option>
          <option value={15}>Last 15 days</option>
          <option value={30}>Last 30 days</option>
        </Select>
      </FormControl>
      </Grid>
        <Grid
          container
          spacing={2}
        >
           
         
   
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FilterInfoCard title="Total sold product" data={totalSoldProduct}/>
            
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FilterInfoCard title="Total Sold amount" data={totalSaleAmount}/>
           
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
             <FilterInfoCard title="Total sold product cost" data={totalProductCost}/>
          </Grid>
    
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FilterInfoCard title="Total profit" data={totalProfit}/>
          </Grid>
        </Grid>
      </Container>
        </Paper>
    )
}

export default Index
