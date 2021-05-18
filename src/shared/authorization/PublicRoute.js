import React from "react";
import { Redirect, Route } from "react-router-dom";
import { PATHS } from "../../utils/constants";

const authRoutes = Object.values(PATHS.PUBLIC.AUTH);

const PublicRoute = ({ component: Component, store, ...rest }) => {
  const accessToken = localStorage.getItem("access_token");
  return (
    <Route
      {...rest}
      render={(props) => {
        const {
          match: { path },
        } = props;
        if (accessToken && authRoutes.includes(path))
          return <Redirect to={PATHS.HOME} />;
        return <Component {...props} />;
      }}
    />
  );
};
export default PublicRoute;
