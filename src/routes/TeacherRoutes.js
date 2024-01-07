import React from "react";
import { Switch, Route } from "react-router-dom";

/* Routes */
import PrivateRoute from "./PrivateRoute";

/* Components */
import Page404 from "../components/shared/Page404/Page404";
import Student from "../layouts/Teacher/Student";

const baseUrl = process.env.PUBLIC_URL;

const TeacherRoute = () => (
  <div className="Teacher-wrapper">
    <Switch>
      <PrivateRoute
        exact
        path={`${baseUrl}/homework/:title?/students`}
        component={Student}
      />
      <Route path="*" component={Page404} />
    </Switch>
  </div>
);

export default TeacherRoute;
