import React, { useContext, useEffect, useState } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import {Link} from 'react-router-dom';

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

import { Button,Paper,makeStyles,Typography} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import AddIcon from '@material-ui/icons/Add';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Notification from '../common/Notification';
import ProductContext from '../../context/ProductContext/ProductContext';

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
    
    },
    deleteContent:{
      border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    },
    deleteContentMiddle:{
      display:'flex',
    },
    deleteContentSpace:{
      paddingRight:6
    }
  }))
 const ProductList = () => {

  const { products, getProducts,deleteProduct,editFormFun,serverMessage } = useContext(ProductContext);

    const classes = useStyles()

    useEffect(() => {
      getProducts();
      // eslint-disable-next-line
    }, []);
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);

    const handleClick = (_id,event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setDeleteId(_id);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;
  

    const handleEdit = (product) => {
      editFormFun(product)
    }
  
    const handleDelete= () => {
      deleteProduct(deleteId)
      handleClick()
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
          src={`${c.image}`}
          style={{width:"2rem",height:"2rem"}}
          className="img-fluid"
          alt="product"
          /></div>),
        price: c.price,
        sellingPrice: c.sellingPrice,
        stock:(c.stock > 0 ? c.stock : <Typography color="error">Stock Out</Typography> ),
        unit: c.unit,
        description: c.description,
        createdAt:(moment( c.createdAt).format("MMMM Do YYYY")),
        action: (<div>
           <Link to="/dashboard/product/edit-product" className={classes.linkStyle}>
          <IconButton onClick={() => handleEdit(c)} aria-label="edit">
           <EditIcon/>
          </IconButton>
          </Link>
          <IconButton aria-describedby={id} type="button" onClick={(event)=>handleClick(c._id,event)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>)
      }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 50 },
      { columnName: 'name', width: 150 },
      { columnName: 'image', width: '5rem'},
      { columnName: 'price', width: 90 },
      { columnName: 'sellingPrice', width: 100 },
      { columnName: 'stock', width: 100 },
      { columnName: 'unit', width: 80  },
      { columnName: 'description', width: 150  },
      { columnName: 'createdAt', width: 150  },
      { columnName: 'action', width: 100 },
    ]);

    return (
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
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

     <div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All product here</h1>
           {serverMessage && <Notification severity='success' message={serverMessage}/> }
           <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.deleteContent}>
              are you want to delete?
              <div className={classes.deleteContentMiddle}>
            <div className={classes.deleteContentSpace}>  <Button  size="small" aria-describedby={id} onClick={handleClick} variant="contained" color="primary">
                    No
                      </Button>
                </div>
                <div>  <Button size="small" aria-describedby={id} variant="contained" onClick={() => handleDelete()} color="primary">
                    Yes
                      </Button>
                </div>
                </div>
            </div>
           
          </Fade>
        )}
      </Popper>
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
        
      
        </div>
    )
}
export default ProductList;
