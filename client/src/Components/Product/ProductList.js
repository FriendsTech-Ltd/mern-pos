import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Table,
  Grid as tGrid,
  TableHeaderRow,
  TableFilterRow,
  VirtualTable,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import ProductContext from '../../context/ProductContext/ProductContext'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    tittle: {
      height: 60,
      padding:0,
      margin:0
    },
    addButton:{
      paddingTop:10,
      marginRight:8,
      direction: 'rtl',
    },
    link:{
      
    },
    content:{
       margin:10,
       flexGrow: 1,
    height: '77vh',
    overflow: 'auto',
    },
    linkStyle:{
      textDecoration: 'none',
      color: 'white'
    }
  }))
 const ProductList = () => {
  // const productContext = useContext(ProductContext);
  const { products, getProducts } = useContext(ProductContext);

    const classes = useStyles()

    useEffect(() => {
      getProducts();
      // eslint-disable-next-line
    }, []);
    console.log(products);


    const handleEdit = (_id) => {
      console.log(_id)
    }
  
    const handleDelete= (_id) => {
      console.log(_id)
    }
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
    const [columns] = useState([
      { name: 'name', title: 'Product name' },
      { name: 'image', title: 'Image' },
      { name: 'price', title: 'Price' },
      { name: 'sellingPrice', title: 'Selling Price' },
      { name: 'stock', title: 'Current stock' },
      { name: 'unit', title: 'Unit' },
      { name: 'description', title: 'Description' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = products.map((c) => {
      return {
        name: c.name,
        image: 'sdjafk',
        price: c.price,
        sellingPrice: c.sellingPrice,
        stock: c.stock,
        unit: c.unit,
        description: c.description,
        createdAt: c.createdAt,
        action: (<div>
          <IconButton onClick={() => handleEdit(c._id)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(c._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'name', width: 150 },
      { columnName: 'image', width: 150},
      { columnName: 'price', width: 100 },
      { columnName: 'sellingPrice', width: 100 },
      { columnName: 'stock', width: 150 },
      { columnName: 'unit', width: 150  },
      { columnName: 'description', width: 150  },
      { columnName: 'createdAt', width: 250  },
      { columnName: 'action', width: 240 },
    ]);

    return (
        <div>
        <Paper variant="outlined" square className={classes.tittle}>  
          <Grid className={classes.addButton}>
            <Link to ='/dashboard/add-product' className={classes.linkStyle}>
                 <Button variant="contained" color="primary">
                 New Product<AddIcon/>
                </Button>
          </Link>
          </Grid>
           </Paper > 
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All product here</h1>
            <tGrid
              rows={data}
              columns={columns}
            >
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              
              <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
              <TableHeaderRow />
              <TableFilterRow />
            </tGrid>
          </Paper> 
        </div>
    )
}
export default ProductList;