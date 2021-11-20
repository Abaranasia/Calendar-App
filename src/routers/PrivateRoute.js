import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest //Resto de elementos como path, exact...
}) => {

    //    localStorage.setItem('lastpath', rest.location.pathname)
    //console.log(rest.location.pathname)
    /** Vamos a aprovechar el prop location.pathname para registrar 
     * en localstorage la última ruta visitada por el usuario 
    */

    return (
        <Route {...rest}
            component={(props) => (
                (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to="/login" />)
            )}
        >

        </Route>
    )
}
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
