import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
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
import {
  Button,
  Paper,
  makeStyles,
  Typography
  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import CustomerContext from '../../context/CustomerContext/CustomerContext'
import Notification from '../common/Notification'

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
    },

  buttonBar: {
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
    greenColor:{
      color:'green'
    },
    orangeColor:{
      color:'orange'
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
 const CustomerList = () => {

  const { customers, getCustomers,editFormFun,deleteCustomer,serverMessage } = useContext(CustomerContext);

    const classes = useStyles()

    useEffect(() => {
      getCustomers();
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
  

    const handleEdit = (customer) => {
      editFormFun(customer)
    }
  
    const handleDelete= () => {
      deleteCustomer(deleteId)
      handleClick()
    }
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: 'name', title: 'Customer name' },
      { name: 'phone', title: 'Phone' },
      { name: 'email', title: 'Email' },
      { name: 'address', title: 'Address' },
      { name: 'due', title: 'Due' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'view', title: 'View' },
      { name: 'action', title: 'Action', columnFilteringEnabled: false },
    ]);
  
    const data = customers.map((c,index) => {
      return {
        sl: index+1,
        name: c.name,
        phone: c.phone,
        email:(c.email? c.email : <Typography className={classes.orangeColor}>no Email</Typography> ),
        address: c.address,
        due: (c.due > 0? <Typography color="error">৳{c.due}</Typography> : <Typography className={classes.greenColor}>No Due</Typography> ),
        createdAt:(moment( c.createdAt).format("MMMM Do YYYY")),
        view:( <Link className={classes.linkStyle} to={`/dashboard/customer/${c._id}`}><Button variant="contained" size="small" color="primary">
          View
        </Button> </Link>),
  
        action: (<div>
          <Link to ="/dashboard/customer/edit-customer">
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
      { columnName: 'name', width: 150  },
      { columnName: 'phone', width: 140 },
      { columnName: 'email', width: 150 },
      { columnName: 'address', width: 160 },
      { columnName: 'due', width: 120  },
      { columnName: 'createdAt', width: 150  },
      { columnName: 'view', width: 70  },
      { columnName: 'action', width: 120 },
    ]);


    return (
        <div>
             <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
                <div className={classes.addButton} >
                  <Link to ='/dashboard/customer/add-customer' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                      <AddIcon/>New Customer
                      </Button>
                </Link>
                </div>
           </Paper > 

     <div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h1>All customer here</h1>
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
export default CustomerList;
