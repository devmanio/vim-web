import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./components/Login/Login";
import App from "./components/App/App";
import Index from "./components/Index/Index";
import PrivateRoute from "./components/PriveteRoute/PrivateRoute";

export function getRoutes() {
	return (
		<App>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/index"/>}/>
				<Route path="/login" component={Login}/>
				<PrivateRoute path="/index" component={Index}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</App>
	)
}