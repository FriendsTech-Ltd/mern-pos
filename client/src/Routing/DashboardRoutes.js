import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import Profile from '../Components/Auth/Profile'
import EditProfile from '../Components/Auth/EditProfile'
import ProductList from '../Components/Product/ProductList';
import AddProduct from '../Components/Product/AddProduct';
import CustomerList from '../Components/Customer/CustomerList';
import AddCustomer from '../Components/Customer/AddCustomer';
import CustomerDetails from '../Components/Customer/CustomerDetails';
import Invoice from '../Components/Invoice/Invoice';
import InvoiceList from '../Components/Invoice/InvoiceList';
import CreateInvoice from '../Components/Invoice/CreateInvoice'
const DashboardRoutes = () => {
    return (
        <Switch>
         <Route
          exact
          path="/dashboard"
          component={DashboardInfo}
        />
         <Route
          exact
          path="/dashboard/me"
          component={Profile}
        />
         <Route
          exact
          path="/dashboard/edit-profile"
          component={EditProfile}
        />
          <Route
          exact
          path="/dashboard/product"
          component={ProductList}
        />
         <Route
          exact
          path="/dashboard/add-product"
          component={AddProduct}
        />
          <Route
          exact
          path="/dashboard/customer"
          component={CustomerList}
        />
          <Route
          exact
          path="/dashboard/add-customer"
          component={AddCustomer}
        />
          <Route
          exact
          path="/dashboard/:id"
          component={CustomerDetails}
        />
          <Route
          exact
          path="/dashboard/customer/invoice"
          component={Invoice}
        />
          <Route
          exact
          path="/dashboard/invoice/create-invoice"
          component={CreateInvoice}
        />
          <Route
          exact
          path="/dashboard/invoice/invoice-list"
          component={InvoiceList}
        />

        </Switch>
    )
}
export default DashboardRoutes;