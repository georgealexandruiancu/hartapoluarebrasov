import React, { Component } from 'react';
import * as UI from '../functions/iancu.toggle.js';
import * as UIModal from '../functions/iancu.openModal.js';
import ModalAdmin from './ModalAdmin.js';

class SideLeft extends Component {

	constructor (props) {
		super(props);

		this.state = {
			modalAdmin: false,
			modalUser: false,
		};
	}

	render() {
		return (
			<>
				<div className="container__row">
					<div className="side-bar-toggle  side-bar-toggle--left  js-side-bar-toggle"
						onClick={((e) => UI.toggleSide(e))}
					>
						<i className="fa fa-arrow-circle-left"></i>
					</div>

					<div className="side-bar__content">
						<div className="side-bar__menu--header">
							Hello, <span>Alex Iancu</span>
						</div>
						<li className="side-bar__menu--item  active  js-menu-item" onClick={(e) => UI.makeActiveMenu(e)}>
							Dashboard
						</li>
						<li className="side-bar__menu--item  js-menu-item"  onClick={(e) => UI.makeActiveMenu(e)}>
							View Data
						</li>
						<li className="side-bar__menu--item  js-menu-item"  onClick={(e) => UI.makeActiveMenu(e)}>
							Filter Data
						</li>
						<li className="side-bar__menu--item  js-menu-item"  onClick={(e) => UI.makeActiveMenu(e)}>
							Search Data
						</li>
						<li className="side-bar__menu--item  js-menu-item"  onClick={(e) => UI.makeActiveMenu(e)}>
							Your Device
						</li>
						<li className="side-bar__menu--item  js-menu-item"  onClick={(e) => UI.makeActiveMenu(e)}>
							Account Settings
						</li>
					</div>

					<div className="side-bar__menu--footer">
						<i className="fa fa-times-circle-o"></i> Logout
					</div>
				</div>
			</>
		);
	}
}

export default SideLeft;