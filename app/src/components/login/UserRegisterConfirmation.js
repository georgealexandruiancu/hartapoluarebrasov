import React, { Component } from 'react';

import * as UI from '../../functions/iancu.splashScreen.js';

class UserConfirmation extends Component {

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
								Please confirm registration
							</div>
							<div className="form-user__description">
								You have received on email a 4 digit code, please enter bellow
							</div>

							<div className="form-user__input-holder">
								<div className="form-user__input  form-user__input--large">
									<label>
										<input type="text" autoComplete="off" placeholder="1" />
									</label>
									<label>
										<input type="text" autoComplete="off" placeholder="2" />
									</label>
									<label>
										<input type="text" autoComplete="off" placeholder="3" />
									</label>
									<label>
										<input type="text" autoComplete="off" placeholder="4" />
									</label>
								</div>
								<div className="form-user__input  form-user__input--button">
									<button className="button-primary">CONFIRM</button>
								</div>
							</div>
							<div className="form-user__loading">
								<div className="o-ring">
									<div></div><div></div><div></div><div></div>
								</div>
							</div>
							<div className="form-user__message--success">
								<div>
									<i class="fa fa-check" aria-hidden="true"></i>
								</div>
									Your account has been verified! Please login
								<div>
									<button className="button-primary  button-primary--alt">LOGIN</button>
								</div>
							</div>

							<div className="form-user__message--bad">
								<div>
									<i class="fa fa-times" aria-hidden="true"></i>
								</div>
								Your code doesn't match, please try again.
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

export default UserConfirmation;