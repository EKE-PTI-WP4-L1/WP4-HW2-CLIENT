import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import login from './user/login';
import regi from './user/regi';
import user from './user/user';
import product from './user/product';

const Router = () => (
	<BrowserRouter>

		<Switch>
			<Route path ="/login" exact component = {login}/>
			<Route path ="/regi" exact component = {regi}/>
			<Route path ="/user" exact component = {user}/>
			<Route path ="/product" exact component = {product}/>
			<Redirect exact from="/" to="/login"/>
		</Switch>

	</BrowserRouter>

	)
export default Router;