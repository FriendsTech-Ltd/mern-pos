import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import Profile from '../Components/Auth/Profile'
import ProfileView from '../Components/Auth/account/AccountView/index'
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
import CreateInvoice from '../Components/Invoice/CreateInvoice';
import Invoice from '../Components/Invoice/InvoicePrint';
import UpCoaming from '../Components/common/UpCoaming';
import Calculator from '../Components/common/Calculator';
import DeleteAccount from '../Components/Auth/DeleteAccount'
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
          component={ProfileView}
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
          path="/dashboard/invoice/single"
          component={Invoice}
        />
         <Route
          exact
          path="/dashboard/reports"
          component={UpCoaming}
        />
          <Route
          exact
          path="/dashboard/e-commerce"
          component={UpCoaming}
        />
         <Route
          exact
          path="/dashboard/current-month"
          component={UpCoaming}
        />
          <Route
          exact
          path="/dashboard/last-quarter"
          component={UpCoaming}
        />
         <Route
          exact
          path="/dashboard/year-end"
          component={UpCoaming}
        />
         <Route
          exact
          path="/dashboard/calculator"
          component={Calculator}
        />
        <Route
          exact
          path="/dashboard/delete-account"
          component={DeleteAccount}
        />
          <Route
          exact
          path="/dashboard/customer/:id"
          component={CustomerDetails}
        />
        

        </Switch>
    )
}
export default DashboardRoutes;