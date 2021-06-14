import React from "react";
import { Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Navigation from "../Components/Navigation";
import Profile from "../Components/Profile";
import Register from "../Components/Register";

const Routes = () => {
    return (
        <Router>
            <Navigation/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/profile">
                    <Profile/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;