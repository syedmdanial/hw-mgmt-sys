import React from "react";
import { Router, Route, withRouter, Switch } from "react-router-dom";
import { history } from "./history";
import PrivateRoute from "./PrivateRoute";
import Page404 from "../components/shared/Page404/Page404";

/* Routes */
import DashboardRoutes from "./DashboardRoutes";

/* Layouts */
import Login from "../layouts/Authenticate/Login";
import Register from "../layouts/Authenticate/Register";
import CreatePassword from "../layouts/Authenticate/CreatePassword";

const baseUrl = process.env.PUBLIC_URL;

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={`${baseUrl}/`} component={withRouter(Login)} />
        <Route exact path={`${baseUrl}/login`} component={withRouter(Login)} />
        <Route
          exact
          path={`${baseUrl}/register`}
          component={withRouter(Register)}
        />
        <Route
          exact
          path={`${baseUrl}/create-password`}
          component={withRouter(CreatePassword)}
        />
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
