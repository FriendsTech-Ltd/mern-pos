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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
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
  saleColor:{
    color: '#154360 '
  },
  soldColor:{
color: '#01579b',
  }
}));



export default function InteractiveList() {
  const classes = useStyles();

  const {getSaleInfoByDay,recentSaleByDay,} =useContext(InvoiceContext);

  const [day, setDay] = React.useState(0);
  
  useEffect(()=>{
    getSaleInfoByDay(day);
    //eslint-disable-next-line
  },[day]);
  
  const handleClick = (e) => {
    setDay(e.target.value)
  
  };
  const {totalProductCost,totalProfit,totalSaleAmount,totalSoldProduct,totalSoldInvoice,currentCash,totalDue }  = recentSaleByDay || {}
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
        
          <option value={0}>Today</option>
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

            <List >
                <ListItem divider={true}
                className={classes.saleColor}>
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Sale Amount"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography
                      className={classes.saleColor}>
                       
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


            <List >
                <ListItem divider={true}
                className={classes.soldColor} >
                      <AccountBalanceWalletIcon fontSize="small" />
                  <ListItemText
                    primary="Current Cash"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.soldColor}>
                      ৳ <span className={classes.soldColor} >{currentCash ? NumberWithComma(currentCash) : defaultValue}</span> 
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>

            <List >
                <ListItem divider={true}
                className={classes.costColor} >
                      <IndeterminateCheckBoxIcon fontSize="small" />
                  <ListItemText
                    primary="Due"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.costColor}>
                      ৳ <span className={classes.costColor} >{totalDue ? NumberWithComma(totalDue) : defaultValue}</span> 
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>

            <List >
                <ListItem divider={true}
                className={classes.profitColor} >
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Invoice"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.profitColor}>
                      ৳ <span className={classes.profitColor} >{totalSoldInvoice ? totalSoldInvoice : defaultValue}</span> 
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



          </div>
        </Grid>
     
    </div>
  );
}