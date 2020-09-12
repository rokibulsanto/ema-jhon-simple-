import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';

const PrivateRoute = ({children , ...rest}) => {
    const [userLoggedIn , setUserLoggedIn] = useContext(userContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
        userLoggedIn.email  ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;