import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" exact component={LoginScreen} />
                    <Route path="/" exact component={CalendarScreen} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
