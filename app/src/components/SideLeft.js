import React, { Component } from 'react';
import * as UI from '../functions/iancu.toggle.js';

class SideLeft extends Component {

	render() {
		return (
			<div className="container__row">
				<div className="side-bar-toggle  side-bar-toggle--left  js-side-bar-toggle"
					onClick={((e) => UI.toggleSide(e))}
				>
					<i className="fa fa-arrow-circle-left"></i>
				</div>

				<div className="side-bar__content">
					<div className="side-bar__item">
						<i class="fa fa-users"></i> Utilizator
					</div>
					<div className="side-bar__item">
						<i class="fa fa-lock"></i> Administrator
					</div>
				</div>
			</div>
		);
	}
}

export default SideLeft;