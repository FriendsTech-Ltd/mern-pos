import React, { useContext,useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import moment from 'moment';
import {
    FilteringState,
    IntegratedFiltering,
  } from '@devexpress/dx-react-grid';
  import {
    Table,
    TableHeaderRow,
    TableFilterRow,
    VirtualTable,
    Grid,
  } from '@devexpress/dx-react-grid-material-ui';
  import Notification from '../common/Notification';
  import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'
  const useStyles = makeStyles((theme) => ({
    linkStyle:{
        textDecoration: 'none',
        color: 'white'
      },

  }))

const InvoiceTable = ({totalSell}) => {
    const classes = useStyles()
  const {getInvoice,deleteInvoice,serverMessage} =useContext(InvoiceContext)

 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteId, setDeleteId] = React.useState(null);

  const handleClick = (_id,event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setDeleteId(_id);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;


  const handleDelete= () => {
    deleteInvoice(deleteId)
    handleClick()
  }
    
      const [filteringStateColumnExtensions] = useState([
        { columnName: 'action', filteringEnabled: false },
        { columnName: 'viewDetails', filteringEnabled: false },
      ]);
    
      const [columns] = useState([
        { name: 'sl', title: 'Sl' },
        { name: 'date', title: 'Date' },
        { name: 'totalAmount', title: 'Total Amount' },
        { name: 'payAmount', title: 'Pay Amount' },
        { name: 'due', title: 'Due' },
        { name: 'viewDetails', title: 'View' },
        { name: 'action', title: 'Action', columnFilteringEnabled: false },
      ]);
    
      const data = totalSell.map((invoice,index) => {
        return {
          sl: index+1,
          date: moment(invoice.createdAt).format("MMMM Do YYYY"),
          totalAmount: invoice.totalAmountAfterDiscount,
          payAmount:invoice.payAmount,
          due:(invoice.due > 0 ? <Typography color="error">৳{invoice.due}</Typography> : <Typography color='primary'>Paid</Typography>),
          viewDetails:( <Link className={classes.linkStyle}to='/dashboard/customer/invoice'><Button onClick={()=>getInvoice(invoice._id)} variant="contained" size="small" color="primary">
          View
        </Button> </Link>),
          action: (<div>
            <IconButton aria-describedby={id} type="button" onClick={(event)=>handleClick(invoice._id,event)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>)
        }
      })
    
    //   const [defaultColumnWidths] = useState([
    //     { columnName: 'sl', width: 150 },
    //     { columnName: 'date', width: 240  },
    //     { columnName: 'totalAmount', width: 130  },
    //     { columnName: 'payAmount', width: 130  },
    //     { columnName: 'due', width: 130  },
    //     { columnName: 'viewDetails', width: 150  },
    //     { columnName: 'action', width: 110 },
    //   ]);
  
    return (
        <div>
             {serverMessage && <Notification severity='error' message={serverMessage}/> }
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
              <VirtualTable height="500px" width='100%'/>
              
              {/* <TableColumnResizing defaultColumnWidths={defaultColumnWidths} /> */}
              <TableHeaderRow />
              <TableFilterRow />
          
            </Grid>
        </div>
    )
}

export default InvoiceTable
