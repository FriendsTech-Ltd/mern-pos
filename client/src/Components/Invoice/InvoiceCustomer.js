import React, { useState } from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  input:{
    fontSize: '15px',
    height: '30px',
    boxSizing: 'border-box',
    padding: '4px 6px',
    width: 0,
    minWidth: '30px',
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
  },
  listbox: {

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

 
 const InvoiceCustomer = () => {
    const classes = useStyles();
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
      } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: top100Films,
        getOptionLabel: (option) => option.name,
      })
    return (
        <div>
   <Paper elevation={5} className={classes.customerSearch}>
   <div>
      <div {...getRootProps()} className={classes.searchIcon}>
      <AddBoxIcon className={classes.iconSize}/>
      <InputWrapper>
        <input className={classes.input} {...getInputProps()} />
      </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.name}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
        </Paper>

        <Paper elevation={5}className={classes.customerDetails}>
           <p>Name: {value? value.name : null} </p> 
           <p>Phone: {value? value.phone : null}</p>
           <p> address: {value? value.address : null}</p>
           <p>due: {value? value.due : null} </p>
        </Paper>
            
        </div>
    )
}

const top100Films = [
    { _id: 'isdbf87', name: 'The Shawshank Redemption', phone: 234, address: 'Bangladesh', due: 456 },
    { _id: 'ert34', name: 'The Shawshank ', phone: 234, address: 'Bangladesh', due: 2345 },
    { _id: '345er', name: 'The ', phone: 1994, address: 'Bangladesh', due: 57 },
    { _id: 'ert34', name: 'The  Redemption', phone: 3445, address: 'Bangladesh', due: 234 },
    { _id: 'treetrd', name: 'Shawshank Redemption', phone: 3455, address: 'Bangladesh', due: 654 }
]
export default InvoiceCustomer