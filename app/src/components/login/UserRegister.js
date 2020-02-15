import React, { Component } from 'react';

import * as UI from '../../functions/iancu.splashScreen.js';

class UserRegister extends Component {

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
				<div className="splashscreen-wrapper  splashscreen-no-reverse">
					<div className="col  form-wrapper  js-controler-height">
						<div className="form-user  js-controler-height-child">
							<div className="form-user__title">
								User Register
							</div>

							<div className="form-user__input-holder">
								<div className="form-user__input">
									<label>
										<input type="email" autoComplete="off" placeholder="Enter your email" />
									</label>
								</div>
								<div className="form-user__input">
									<label>
										<input type="password" autoComplete="off" placeholder="Your password goes here" />
									</label>
								</div>
								<div className="form-user__input">
									<label>
										<input type="password" autoComplete="off" placeholder="Confirm Password" />
									</label>
								</div>
								<div className="form-user__input  form-user__input--button">
									<div className="form-user__checkbox">
										<label>
											<input type="checkbox" className="css-checkbox" defaultChecked />
											<i></i>
										</label>
										<div className="form-user__checkbox--text">
											I read & I accept the <a href="#">terms and conditions.</a>
										</div>
									</div>

									<button className="button-primary">REGISTER</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col  splashscreen-wrapper__bg  js-controler-height">
						<div className="splashscreen__overlay"></div>
						<div className="pulse">
							<img src={require("../../assets/Logo_Text_White.png")} alt="Harta Poluare Brasov"/>
						</div>
					</div>
				</div>
		);
	}
}

export default UserRegister;