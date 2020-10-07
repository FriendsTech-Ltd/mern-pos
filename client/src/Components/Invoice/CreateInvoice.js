import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// const options = ['product1', 'product2'];
const CreateInvoice = () => {
    // const [value, setValue] = React.useState(options[0]);
    const [invoiceItem,setItem] = useState([])
    console.log(invoiceItem)
    const item =  []
    const top100Films = [
        { name: 'The Shawshank Redemption', _id: '1994' },
        { name: 'The Godfather', _id: '1972' },
        { name: 'The Godfather: Part II', _id: '1974' }
   
      
      ]

      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
    
        tittle: {
          height: 60,
          padding:0,
          margin:0
        },
        content:{
           margin:8,
           flexGrow: 1,
           textAlign: 'center',
        height: '77vh',
        overflow: 'auto',
        },
        linkStyle:{
          textDecoration: 'none',
          color: 'white'
        },
        spinner: {
          textAlign: 'center',
          marginTop:'17%'
        
        },
        table: {
            minWidth: 650,
          },
      }))

      const classes = useStyles()
    return (
        <div>

      
        <div style={{ width: 300 }}>
  
  <Autocomplete
        onInputChange={(event, newInputValue) => {
            setItem([...invoiceItem,newInputValue]);
        }}
        id="controllable-states-demo"
        options={top100Films.map((option) => option._id)}
        // getOptionLabel={top100Films.map((option) => option.name)}
        style={{ width: 300,padding:5}}
        renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
      />

      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl</TableCell>
            <TableCell align="right">Product Name</TableCell>
            {/* <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((product,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{product.name}</TableCell>
              {/* <TableCell align="right">{product.sellingPrice}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{product.sellingPrice*product.quantity}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</div>

    )
}
export  default  CreateInvoice;