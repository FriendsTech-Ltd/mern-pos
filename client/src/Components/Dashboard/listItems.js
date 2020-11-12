import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import AssignmentIcon from '@material-ui/icons/Assignment';
const linkStyle = {
  textDecoration: 'none',
  color: 'black'
}

export const mainListItems = (
  <div>
    <Link to ='/dashboard' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItem>
    </Link>
    <Link to ='/dashboard/product' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/customer' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Customer" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/invoice/invoice-list' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Invoice" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/reports' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/e-commerce' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="E-Commerce" />
    </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <Link to ='/dashboard/current-month' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/last-quarter' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/year-end' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
    </Link>

    <Link to ='/dashboard/calculator' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <FeaturedPlayListIcon />
      </ListItemIcon>
      <ListItemText primary="Calculator" />
    </ListItem>
    </Link>
  </div>
);