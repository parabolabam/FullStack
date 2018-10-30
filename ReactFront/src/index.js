import { BrowserRouter as Router, Route } from "react-router-dom";
import React from 'react';
import { render } from 'react-dom';
import Home from './components/App/App.jsx';
import RegistrationForm from './components/RegisterForm/registrationForm.jsx'
import SigninForm from './components/SignInForm/SignInForm.jsx';
import LogOutBtn from './components/LogoutBtn/LogoutBtn.jsx';
render(

    <Router>
		<Route exact={true} path="/" component={RegistrationForm}></Route>
		<Route path="/signin" component={SigninForm}></Route>
		<Route  path="/home" component={Home}></Route>
		<Route path="/logout" componenet={LogOutBtn}></Route>				
	</Router>, document.getElementById('root'));