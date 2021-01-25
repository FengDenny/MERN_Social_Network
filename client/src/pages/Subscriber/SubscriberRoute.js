import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../utility/helper/helpers";

const SubRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    ></Route>
  );
};

export default SubRoute;
