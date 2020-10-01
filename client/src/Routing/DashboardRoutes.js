import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import ProductList from '../Components/Product/ProductList';
import AddProduct from '../Components/Product/AddProduct'
import CustomerList from '../Components/Customer/CustomerList';
import AddCustomer from '../Components/Customer/AddCustomer'
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

        </Switch>
    )
}
export default DashboardRoutes;