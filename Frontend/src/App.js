import React from "react";
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";

import AdminRoute from "./routes/AdminRoute";
import AuthorizedRoute from "./routes/AuthorizedRoute";
import UnauthorizedRoute from "./routes/UnauthorizedRoute";

import MainPage from "./components/main-page";
import Admin from "./components/admin";
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import Profile from "./components/profile";
import Booking from "./components/booking";

import { Provider } from "react-redux";
import store from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <AdminRoute path="/admin" component={Admin} />
                    <UnauthorizedRoute path="/signup" component={SignUp} />
                    <UnauthorizedRoute path="/signin" component={SignIn} />
                    <AuthorizedRoute path="/profile" component={Profile} />
                    <AuthorizedRoute path="/booking/:id" component={Booking} />
                    <Route path="/" component={MainPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;