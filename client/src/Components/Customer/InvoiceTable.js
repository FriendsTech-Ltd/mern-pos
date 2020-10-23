import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert'
import moment from 'moment'
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
  import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'
  const useStyles = makeStyles((theme) => ({
    linkStyle:{
        textDecoration: 'none',
        color: 'white'
      },

  }))

const InvoiceTable = ({totalSell}) => {
    const classes = useStyles()
  const {getInvoice} =useContext(InvoiceContext)

  
    const handleDelete= (_id) => {
        console.log(_id)
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
            <IconButton onClick={() => handleDelete(invoice._id)} aria-label="delete">
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
