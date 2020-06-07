import React, { Component } from 'react';

import axios from "axios";

import * as UI from '../../functions/iancu.splashScreen.js';

class UserLogin extends Component {

	constructor() {
		super();
		this.state = {
			email: "",
			password: ""
		};

		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
	}

	componentDidMount() {
		UI.ModifySizeCol();

		window.addEventListener("resize", UI.ModifySizeCol);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", UI.ModifySizeCol);
	}

	onChangeEmail = (e) => {
		this.setState({ email: e.target.value });
	}

	onChangePassword = (e) => {
		this.setState({ password: e.target.value });
	}

	makeLogin() {

		var instance = axios.create({
			withCredentials: true
		});

		instance
			.post("http://localhost:3001/users/login", {
				email: this.state.email,
				password: this.state.password
			})
			.then(function(response) {
				console.log(response);
				if (response.status === 200) {
					console.log("ok");
				} else if (response.status === 401) {
					alert("Unable to login, please try again!");
				}
			})
			.catch(function(error) {
				if (error) {
					alert("Unable to login, please try again!");
				}
			});
	}

	render() {
		return (
				<div className="splashscreen-wrapper">
					<div className="col  splashscreen-wrapper__bg  js-controler-height">
						<div className="splashscreen__overlay"></div>
						<div className="pulse">
							<img src={require("../../assets/Logo_Text_White.png")} alt="Harta Poluare Brasov"/>
						</div>
					</div>
					<div className="col  form-wrapper  js-controler-height">
						<div className="form-user">
							<div className="form-user__title">
								User Login
							</div>

							<div className="form-user__input-holder">
								<div className="form-user__input">
									<input type="email" autoComplete="off" placeholder="Enter your email" onChange={this.onChangeEmail} value={this.state.email} />
								</div>
								<div className="form-user__input">
									<input type="password" autoComplete="off" placeholder="Your password goes here" onChange={this.onChangePassword} value={this.state.password} />
								</div>
								<div className="form-user__input  form-user__input--button">
									<button className="button-primary" onClick={() => this.makeLogin()}>LOGIN</button>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default UserLogin;