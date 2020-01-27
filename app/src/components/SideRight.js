import React, { Component } from 'react';
import * as UI from '../functions/iancu.toggle.js';


class SideRight extends Component {

	render() {
		return (
			<div className="container__row">
				<div className="side-bar-toggle  side-bar-toggle--right  js-toggle-sidebar"
					onClick={((e) => UI.toggleSide(e))}
				>
					<i className="fa fa-arrow-circle-right"></i>
				</div>

				<div className="side-bar__content">
					<div className="side-bar__item">
						CO
					</div>
					<div className="side-bar__item">
						Directia vantului
					</div>
					<div className="side-bar__item">
						NO
					</div>
					<div className="side-bar__item">
						NO2
					</div>
					<div className="side-bar__item">
						NOx
					</div>
					<div className="side-bar__item">
						O3
					</div>
					<div className="side-bar__item">
						PM10
					</div>
					<div className="side-bar__item">
						Presiunea aerului
					</div>
				</div>
			</div>
		);
	}
}

export default SideRight;