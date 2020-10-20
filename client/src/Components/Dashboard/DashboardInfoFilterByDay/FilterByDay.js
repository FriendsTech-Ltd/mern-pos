import React,{useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoneyIcon from '@material-ui/icons/Money';
import  NumberWithComma from '../../../utils/NumberWithComma';
import InvoiceContext from '../../../context/InvoiceContext/InvoiceContext'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
 
  listStyle:{
      padding:0,
      margin:0
  },
  profitColor:{
      color:'green'
  },
  saleAmountColor:{
    color:'green'
  },
  costColor:{
      color:'red'
  },
  soldColor:{
color: '#01579b',
  }
}));



export default function InteractiveList() {
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
 const defaultValue = 0;
  return (
    <div className={classes.root}>
   
     
        <Grid>
        <Grid className={classes.selectMenu}>
              <FormControl  style={{width:'210px'}} size="small" >
        <InputLabel htmlFor="outlined-age-native-simple">Sale Info Filter By Days</InputLabel>
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

          <div className={classes.demo}>


            <List >
                <ListItem divider={true} className={classes.soldColor}>
                      <RemoveShoppingCartIcon fontSize="small" />
                  <ListItemText
                    primary="Sale Product"
                  
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.soldColor}>
                     {totalSoldProduct ? totalSoldProduct : defaultValue}
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>

            <List className={classes.listStyle}>
                <ListItem divider={true}
                className={classes.costColor}>
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Product Cost"
                
                  />
                  <ListItemSecondaryAction>
                      <Typography
                      className={classes.costColor}>
                        ৳ {totalProductCost ? NumberWithComma(totalProductCost) : 0}
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>


            <List >
                <ListItem divider={true}
                className={classes.saleAmountColor}>
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Sale Amount"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography
                      className={classes.saleAmountColor}>
                       
                       ৳ {totalSaleAmount ? NumberWithComma(totalSaleAmount) : defaultValue}
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>
            <List >
                <ListItem divider={true}
                className={classes.profitColor} >
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Profit"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.profitColor}>
                      ৳ <span className={classes.profitColor} >{totalProfit ? NumberWithComma(totalProfit) : defaultValue}</span> 
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>
          </div>
        </Grid>
     
    </div>
  );
}