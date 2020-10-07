// import React,{ useState } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
// // const options = ['product1', 'product2'];
// const CreateInvoice = () => {
//     // const [value, setValue] = React.useState(options[0]);
//     const [invoiceItem,setItem] = useState([])
//     console.log(invoiceItem)
//     const item =  []
//     const top100Films = [
//         { name: 'The Shawshank Redemption', _id: '1994' },
//         { name: 'The Godfather', _id: '1972' },
//         { name: 'The Godfather: Part II', _id: '1974' }
   
      
//       ]

//       const useStyles = makeStyles((theme) => ({
//         root: {
//           flexGrow: 1,
//         },
    
//         tittle: {
//           height: 60,
//           padding:0,
//           margin:0
//         },
//         content:{
//            margin:8,
//            flexGrow: 1,
//            textAlign: 'center',
//         height: '77vh',
//         overflow: 'auto',
//         },
//         linkStyle:{
//           textDecoration: 'none',
//           color: 'white'
//         },
//         spinner: {
//           textAlign: 'center',
//           marginTop:'17%'
        
//         },
//         table: {
//             minWidth: 650,
//           },
//       }))

//       const classes = useStyles()
//     return (
//         <div>

      
//         <div style={{ width: 300 }}>
  
//   <Autocomplete
//         onInputChange={(event, newInputValue) => {
//             setItem([...invoiceItem,newInputValue]);
//         }}
//         id="controllable-states-demo"
//         options={top100Films.map((option) => option._id)}
//         // getOptionLabel={top100Films.map((option) => option.name)}
//         style={{ width: 300,padding:5}}
//         renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
//       />

//       </div>
//       <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Sl</TableCell>
//             <TableCell align="right">Product Name</TableCell>
//             {/* <TableCell align="right">Price</TableCell>
//             <TableCell align="right">Quantity</TableCell>
//             <TableCell align="right">Total Price</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {item.map((product,index) => (
//             <TableRow key={index}>
//               <TableCell component="th" scope="row">
//                 {index+1}
//               </TableCell>
//               <TableCell align="right">{product.name}</TableCell>
//               {/* <TableCell align="right">{product.sellingPrice}</TableCell>
//               <TableCell align="right">{product.quantity}</TableCell>
//               <TableCell align="right">{product.sellingPrice*product.quantity}</TableCell> */}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>

// </div>

//     )
// }
// export  default  CreateInvoice;

/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 300px;
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
    font-size: 14px;
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

export default function CustomizedHook() {
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
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  

  return (
    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Customized hook</Label>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <Tag label={option.title} {...getTagProps({ index })} />
            ))}

            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.title}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: '1994', _id: 'Dummy text' },
  { title: 'The Godfather', year: '1972' },
  { title: 'The Godfather: Part II', year: '1974', _id: 'Dummy text'},
  { title: 'The Dark Knight', year: '2008', _id: 'Dummy text' },
  { title: '12 Angry Men', year: '1957' },
  { title: "Schindler's List", year: '1993', _id: 'Dummy text' },
  { title: 'Pulp Fiction', year: '1994', _id: 'Dummy text' },
];
