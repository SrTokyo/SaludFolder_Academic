import React from "react";
import { Route, Redirect } from "react-router";

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={(props) =>
          localStorage.getItem('sessionToken') ? (
            <Component {...props} />
          ) : (
            <Redirect to={props.redirect} />
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
