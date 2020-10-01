import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import ProductList from '../Components/Product/ProductList';
import CustomerList from '../Components/Customer/CustomerList';

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
          path="/dashboard/customer"
          component={CustomerList}
        />

        </Switch>
    )
}
export default DashboardRoutes;