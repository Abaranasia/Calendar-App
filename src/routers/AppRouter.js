import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);


    useEffect(() => {

        dispatch(startChecking()) // Ejecutamos esta acción para comprobar que hay token de usuario, por lo que las rutas quedan protegidas 
    }, [dispatch])

    if (checking) {
        return (<h5>Loading...</h5>)
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!uid} // Compobamos que hay un uid, pero siendo string comprobamos si tiene valor
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
