import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo'
import ProductList from '../Components/Product/ProductList'
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
        </Switch>
    )
}
export default DashboardRoutes;