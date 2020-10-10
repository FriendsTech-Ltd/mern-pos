
import React, { useState,useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// /* eslint-disable no-use-before-define */
import AddBoxIcon from '@material-ui/icons/AddBox';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import InvoiceCustomer from './InvoiceCustomer'
import ProductContext from '../../context/ProductContext/ProductContext'
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'
import CustomerContext from '../../context/CustomerContext/CustomerContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:5,
  
    // width: theme.spacing(16),
    // height: theme.spacing(16),

  },
  tittle:{
    textAlign: 'center',
    height:60
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
}));
const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

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

 const CreateInvoice = () => {
  const classes = useStyles();
  const {getProducts,products} = useContext(ProductContext)
  const {getInvoiceProducts,card,invoiceCustomer,increment,decrement} = useContext(InvoiceContext)
  const {getCustomers,customers} = useContext(CustomerContext)

  const {
    getRootProps,
    getInputLabelProps,
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
    options: products,
    getOptionLabel: (option) => option.name,
  });




useEffect(()=>{
  getProducts()
  getCustomers()
  getInvoiceProducts(value)
},[value])

const obj ={
  customer: invoiceCustomer ? invoiceCustomer._id : null,
  products:card
}
const onCreateinvoice=()=>{
console.log(obj)
}

  return (
    <div className={classes.root}>
    <Grid container >
      <Grid item xs={12}>
        <Paper elevation={5}  className={classes.tittle}>Create Invoice</Paper>
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

                 <input {...getInputProps()} />
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
                <TableCell align="right">{product.sellingPrice}</TableCell>
                <TableCell align="right">
                <div>

                {product.quantity  > 1 ? ( <button onClick={()=>decrement(product._id)}>-</button>) : (<button disable>-</button>) }
                    <span>{ product.quantity}</span>
                <button onClick={()=>increment(product._id)}>+</button>
               
                </div>
                 </TableCell>
                <TableCell align="right">{product.sellingPrice*product.quantity}</TableCell>
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
          <p>Sub Total: '100'</p>
          <p>Discount: '10%</p>
          <p>Commission: '1%'</p>
        </Paper>
        <Paper elevation={5} className={classes.accountDetails}>
          <p>Grand Total: '100'</p>
        </Paper>
        <div className={classes.accountDetails}>
        <Button variant="contained" color="primary" onClick={()=>onCreateinvoice()} disableElevation>
      Create Invoice
    </Button>
        </div>
      
      </Grid>
   
    </Grid>
  </div>
  )
}
export default CreateInvoice;

