import React, { useState,useContext,useEffect } from 'react';
import {Link} from 'react-router-dom';
// /* eslint-disable no-use-before-define */
import { makeStyles,
  ButtonGroup,
  TextField, 
  Button, 
  Typography,
  Grid,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddBoxIcon from '@material-ui/icons/AddBox';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InvoiceCustomer from './InvoiceCustomer'
import ProductContext from '../../context/ProductContext/ProductContext'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'
import CustomerContext from '../../context/CustomerContext/CustomerContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:5,
  },
  buttonBar:{
    display:'flex'
  },
  title: {
    padding: 8,
    textAlign:'center'
  },

backButton:{
    padding:5,
  },
  linkStyle:{
    textDecoration: 'none',
    color: 'white'
  },
  productSearch:{
    margin: theme.spacing(1),
    padding:8
  
  },
  searchIcon:{
    display: 'flex',
  },
  iconSize:{
    fontSize:35
  },
  productTable:{
    margin: theme.spacing(1),
  },
  customerSearch:{
    margin: theme.spacing(1),

  },
  customerDetails:{
    margin: theme.spacing(1),
    padding:8

  },
  discountBar:{
    display:'flex',
    paddingLeft:5
  },
  discount:{
   
    marginLeft:'16%'
  },
  accountDetails:{
    margin: theme.spacing(1),
    padding:8,
    textAlign: 'center',

  },

  paper: {
    // padding: theme.spacing(2),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  payButton:{
    flexGrow: 1,
  }
}));


const InputWrapper = styled('div')`
  width: 600px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
   flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 15px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

 const CreateInvoice = (props) => {
  const classes = useStyles();
  const {getProducts,products} = useContext(ProductContext);
  const {getInvoiceProducts,card,invoiceCustomer,increment,decrement,createInvoice,success} = useContext(InvoiceContext);
  const {getCustomers,customers} = useContext(CustomerContext);
  useEffect(() => {
    if(success){
      //eslint-disable-next-line
      props.history.push(`/dashboard/invoice/single`);
    }
    //eslint-disable-next-line
  },[success])

  
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: products.filter((product)=>product.stock > 0 ),
    getOptionLabel: (option) => option.name,
     
  });




useEffect(()=>{
  getProducts();
  getCustomers();
  getInvoiceProducts(value);
  //eslint-disable-next-line
},[value])


const BalanceArray = card.map(function(product) {
  return product.sellingPrice*product.quantity;
});

const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;;
}, 0);


const [discount,setDiscount]=useState(0)
const [payAmount,setPay]=useState(0)
const [due,setDue]=useState(0)

const totalProductAmount = Math.round((totalPrice - (discount/100)*totalPrice))

const payCalculate=(e)=>{
  setDue(totalProductAmount-payAmount)
}
const invoiceObj ={
  customerId: invoiceCustomer ? invoiceCustomer._id : null,
  products:card.map(product => {
    return {_id: product._id, quantity: product.quantity }
  }),
  payAmount:Number(payAmount),
  discount,
  totalProductAmount,
}
const onCreateInvoice=()=>{
if (!invoiceObj.customerId || !invoiceObj.products.length) {
  return alert('please fill all field')
}
  createInvoice(invoiceObj);
}

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/invoice/invoice-list' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
             
           </Paper >
    <Grid container >
      <Grid item xs={12}>
        <Paper elevation={5}  className={classes.title}>Create Invoice</Paper>
      </Grid>

      <Grid item xs={7}>
        <Paper elevation={5} className={classes.productSearch}>
            <NoSsr>
            <div >
              <div {...getRootProps()} className={classes.searchIcon}>
            
                <AddBoxIcon className={classes.iconSize}/> 
              <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                  {value.map((option, index) => (
                    <Tag label={option.name} {...getTagProps({ index })} />
                  ))}

                 <input {...getInputProps()} placeholder="Search Product"/>
                </InputWrapper>
              </div>
              {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                  {groupedOptions.map((option, index) => (
                    <li {...getOptionProps({ option, index })}>
                      <span>{option.name}</span>
                      <CheckIcon fontSize="small" />
                    </li>
                  ))}
                </Listbox>
              ) : null}
            </div>
          </NoSsr>
        </Paper>
  
        <Paper elevation={5} className={classes.productTable}>
          <TableContainer component={Paper}>     
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Price</TableCell> 
              </TableRow>
          </TableHead>
          <TableBody>
              {card.map((product,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.unit}</TableCell>
                <TableCell align="right">৳{product.sellingPrice}</TableCell>
                <TableCell align="right">
                <div>

                {product.quantity  > 1 ? ( <button onClick={()=>decrement(product._id)}>-</button>) : (<button disable>-</button>) }
                <span>{product.quantity }</span>
                {product.quantity  < product.stock ? ( <button onClick={()=>increment(product._id)}>+</button>) : (<button disable>+</button>) }
               
               
                </div>
                 </TableCell>
                <TableCell align="right">৳{product.sellingPrice*product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
        </Paper>

      </Grid>
      <Grid item xs={5}>
        <div>
        <InvoiceCustomer customers={customers}/> 
        </div>
       
        <Paper elevation={5} className={classes.accountDetails}>
              <Typography>Sub Total: ৳{totalPrice}</Typography>
              <Grid className={classes.discountBar}>
                <Grid>
                <ButtonGroup>
                {discount > 0 ? (
                  <Button
                  side='small'
                  aria-label="increase"
                  onClick={() => {
                    setDiscount(discount-1);
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                ) : (
                  <Button aria-label="increase" side='small'>
                  <RemoveIcon fontSize="small" />
                </Button>
                )}
                <Button
                  aria-label="increase"
                  side='small'
                  onClick={() => {
                    setDiscount(discount+1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>

              </ButtonGroup>
                </Grid>
                <Grid className={classes.discount}>
                <Typography>Discount:{discount}%</Typography>
                </Grid>
              </Grid>
           
            
           
          
        </Paper>
        <Paper elevation={5} className={classes.accountDetails}>
          <p>Grand Total: ৳{totalProductAmount}</p>
          <Grid container spacing={3}>
        
        <Grid item xs={8}>
          <TextField
            size="small"
            variant="outlined"
            type="number"
            required
            label="Pay amount"
            name="pay"
            onChange={(e) => setPay(e.target.value)}
          />
     
        </Grid>
        <Grid item xs={4}>
         <Button  variant="outlined" color="primary" onClick={()=>payCalculate()}>Set pay</Button>
        </Grid>
      </Grid>
  
          <p>Due: ৳{due}</p>
        </Paper>
      

    
     
        <div className={classes.accountDetails}>
        <Button variant="contained" color="primary" onClick={()=>onCreateInvoice()} disableElevation>
      Create Invoice
    </Button>
        </div>
      
      </Grid>
   
    </Grid>
  </div>
  )
}
export default CreateInvoice;

