import React from "react";
import { Router, Route, withRouter, Switch } from "react-router-dom";
import { history } from "./history";
import PrivateRoute from "./PrivateRoute";
import Page404 from "../components/shared/Page404/Page404";

/* Routes */
import DashboardRoutes from "./DashboardRoutes";

/* Layouts */
import Login from "../layouts/Authenticate/Login";

const baseUrl = process.env.PUBLIC_URL;

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={`${baseUrl}/`} component={withRouter(Login)} />
        <Route exact path={`${baseUrl}/login`} component={withRouter(Login)} />
        <PrivateRoute
          path={`${baseUrl}/homework`}
          component={withRouter(DashboardRoutes)}
        />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
};

export default Routes;
