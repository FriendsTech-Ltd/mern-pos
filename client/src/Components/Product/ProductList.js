import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import {Link} from 'react-router-dom'

import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Table,
  TableHeaderRow,
  TableFilterRow,
  VirtualTable,
  TableColumnResizing,
  Grid,
} from '@devexpress/dx-react-grid-material-ui';

import { Button,Paper,makeStyles} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from '@material-ui/lab/Alert'

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
      margin:0,
      display:'flex'
    },
  addButton:{
    padding:5,
    marginLeft: 'auto',
    },
  backButton:{
      padding:5,
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
    
    }
  }))
 const ProductList = () => {
  // const productContext = useContext(ProductContext);
  const { products, getProducts,deleteProduct,editFormFun } = useContext(ProductContext);

    const classes = useStyles()

    useEffect(() => {
      getProducts();
      // eslint-disable-next-line
    }, []);
  


    const handleEdit = (product) => {
      editFormFun(product)
    }
  
    const handleDelete= (_id) => {
      deleteProduct(_id)
    }
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: 'name', title: 'Product name' },
      { name: 'image', title: 'Image' },
      { name: 'price', title: 'Price' },
      { name: 'sellingPrice', title: 'Selling Price' },
      { name: 'stock', title: 'Stock' },
      { name: 'unit', title: 'Unit' },
      { name: 'description', title: 'Description' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = products.map((c,index) => {
      return {
        sl: index+1,
        name: c.name,
        image: (<div> <img
          src={`/${c.image}`}
          style={{width:"2rem",height:"2rem"}}
          className="img-fluid"
          alt="product"
          /></div>),
        price: c.price,
        sellingPrice: c.sellingPrice,
        stock:(c.stock >= 0 ? c.stock : <Alert severity="warning">Stock Out</Alert> ),
        unit: c.unit,
        description: c.description,
        createdAt:(moment( c.createdAt).format("MMMM Do YYYY")),
        action: (<div>
           <Link to="/dashboard/product/edit-product" className={classes.linkStyle}>
          <IconButton onClick={() => handleEdit(c)} aria-label="edit">
           <EditIcon/>
          </IconButton>
          </Link>
          <IconButton onClick={() => handleDelete(c._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 50 },
      { columnName: 'name', width: 150 },
      { columnName: 'image', width: '5rem'},
      { columnName: 'price', width: 100 },
      { columnName: 'sellingPrice', width: 100 },
      { columnName: 'stock', width: 130 },
      { columnName: 'unit', width: 80  },
      { columnName: 'description', width: 150  },
      { columnName: 'createdAt', width: 150  },
      { columnName: 'action', width: 100 },
    ]);

    return (
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard/product' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
                <div className={classes.addButton} >
                  <Link to ='/dashboard/product/add-product' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                      <AddIcon/>Add Product
                      </Button>
                </Link>
                </div>
           </Paper > 

      {!products.length ? (<div className={classes.spinner}>
        <CircularProgress size={80} />
        </div>)
         : (<div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All product here</h1>
            <Grid
              rows={data}
              columns={columns}
            >
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              <VirtualTable height="auto"/>
              
              <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
              <TableHeaderRow />
              <TableFilterRow />
          
            </Grid>
          </Paper> 
          </div>
         )
        }
      
        </div>
    )
}
export default ProductList;
