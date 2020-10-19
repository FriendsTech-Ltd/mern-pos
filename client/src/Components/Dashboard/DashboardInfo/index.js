
import React,{useContext,useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import TotalProductCost from './TotalProductCost';
import TotalSale from './TotalSale'
import TotalCustomer from './TotalCustomer';
import TotalDue from './TotalDue';
import TotalProfit from './TotalProfit';
import ProductContext from '../../../context/ProductContext/ProductContext';
import InvoiceContext from '../../../context/InvoiceContext/InvoiceContext';
import CustomerContext from '../../../context/CustomerContext/CustomerContext'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Info = () => {
  const classes = useStyles();
const {getAllProductInfo,productInfo} =useContext(ProductContext);
const {getAllSaleInfo,saleInfo} = useContext(InvoiceContext);
const {getTotalCustomer, totalCustomer} = useContext(CustomerContext)
useEffect(()=>{
  getAllProductInfo();
  getAllSaleInfo();
  getTotalCustomer();
 //eslint-disable-next-line
},[])
  return (
  
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
            <TotalProductCost productInfo={productInfo}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalSale saleInfo={saleInfo}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomer totalCustomer={totalCustomer} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalDue/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit  totalProfit={saleInfo}/>
          </Grid>
        </Grid>
      </Container>

  );
};

export default Info;