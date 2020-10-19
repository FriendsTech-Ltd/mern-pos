import React,{useContext,useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
        <div>
              <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">day</InputLabel>
        <Select
          native
          name="day"
          value={day}
          onChange={(e)=>handleClick(e)}
          label="day"
        >
        
          <option value={1}>Today</option>
          <option value={7}>Last week</option>
          <option value={15}>Last 15 days</option>
          <option value={30}>Last 30 days</option>
        </Select>
      </FormControl>

              <Container maxWidth={false}>
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
        </div>
    )
}

export default Index
