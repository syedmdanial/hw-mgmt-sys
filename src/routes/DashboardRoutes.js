import React from "react";
import { Switch, Route } from "react-router-dom";

/* Routes */
import PrivateRoute from "./PrivateRoute";

/* Components */
import TopNavBar from "../components/TopNavBar/TopNavBar";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Page404 from "../components/shared/Page404/Page404";
import Footer from "../layouts/Dashboard/Footer/Footer";
import TeacherRoute from "./TeacherRoutes";

const baseUrl = process.env.PUBLIC_URL;

const Routes = () => (
  <div className="Dashboard-wrapper">
    <TopNavBar />
    <div className="dashboard-container">
      <Switch>
        <PrivateRoute
          exact
          path={`${baseUrl}/homework`}
          component={Dashboard}
        />
        <PrivateRoute
          path={`${baseUrl}/homework/:title?/students`}
          component={TeacherRoute}
        />
        TeacherRoute
        <Route path="*" component={Page404} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default Routes;
