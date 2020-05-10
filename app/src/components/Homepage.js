import React, { Component } from 'react';
import * as UI from '../functions/iancu.splashScreen.js';

class Homepage extends Component {

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
				<div className="splashscreen-wrapper  splashscreen-wrapper__homepage">
					<div className="col  splashscreen-wrapper__bg  js-controler-height">
						<div className="splashscreen__overlay"></div>
						<div className="pulse">
							<img src={require("../assets/Logo_Text_White.png")} alt="Harta Poluare Brasov"/>
							
						</div>
						<div className="splashscreen__buttons">
							<a href="/login">
								<button className="button-primary">LOGIN</button>
							</a>
							<a href="/register">
								<button className="button-primary">REGISTER</button>
							</a>
						</div>
					</div>
				</div>
		);
	}
}

export default Homepage;