import React, { Component } from 'react';

import * as UI from '../../functions/iancu.splashScreen.js';

class UserLogin extends Component {

	constructor() {
		super();
		this.state = { 
		 
		};

	}

	componentDidMount() {
		UI.ModifySizeCol();

		window.addEventListener("resize", UI.ModifySizeCol);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", UI.ModifySizeCol);
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
									<input type="email" autoComplete="off" placeholder="Enter your email" />
								</div>
								<div className="form-user__input">
									<input type="password" autoComplete="off" placeholder="Your password goes here" />
								</div>
								<div className="form-user__input  form-user__input--button">
									<button className="button-primary">LOGIN</button>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default UserLogin;