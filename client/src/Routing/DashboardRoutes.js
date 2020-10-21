import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import Profile from '../Components/Auth/Profile'
import EditProfile from '../Components/Auth/EditProfile'
import ChangePassword from '../Components/Auth/ChangePassword';
import ProductList from '../Components/Product/ProductList';
import AddProduct from '../Components/Product/AddProduct';
import EditProduct from '../Components/Product/EditProduct'
import CustomerList from '../Components/Customer/CustomerList';
import AddCustomer from '../Components/Customer/AddCustomer';
import EditCustomer from '../Components/Customer/EditCustomer'
import CustomerDetails from '../Components/Customer/CustomerDetails';
import CustomerInvoice from '../Components/Customer/CustomerInvoice';
import InvoiceList from '../Components/Invoice/InvoiceList';
import CreateInvoice from '../Components/Invoice/CreateInvoice'
import Invoice from '../Components/Invoice/InvoicePrint'
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
          path="/dashboard/change-password"
          component={ChangePassword}
        />
          <Route
          exact
          path="/dashboard/product"
          component={ProductList}
        />
         <Route
          exact
          path="/dashboard/product/add-product"
          component={AddProduct}
        />
         <Route
          exact
          path="/dashboard/product/edit-product"
          component={EditProduct}
        />
          <Route
          exact
          path="/dashboard/customer"
          component={CustomerList}
        />
          <Route
          exact
          path="/dashboard/customer/add-customer"
          component={AddCustomer}
        />
         <Route
          exact
          path="/dashboard/customer/edit-customer"
          component={EditCustomer}
        />
        
          <Route
          exact
          path="/dashboard/customer/invoice"
          component={CustomerInvoice}
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
          <Route
          exact
          path="/dashboard/customer/:id"
          component={CustomerDetails}
        />
          <Route
          exact
          path="/dashboard/invoice/:id"
          component={Invoice}
        />

        </Switch>
    )
}
export default DashboardRoutes;