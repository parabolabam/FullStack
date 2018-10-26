import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App.jsx';
import RegistrationForm from './components/RegisterForm/registrationForm.jsx'
import SigninForm from './components/SignInForm/SignInForm.jsx';

render(
    <Router>
	<Route exact={true} path="/" component={RegistrationForm} ></Route>
	<Route path="/signin" component={SigninForm}></Route>
	<Route path="/home" component={App}></Route>
</Router>, document.getElementById('root'));