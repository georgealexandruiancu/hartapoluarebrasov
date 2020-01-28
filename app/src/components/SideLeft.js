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
						<div className="side-bar__item"
							onClick={() => UIModal.openModalUser()}
						>
							<i class="fa fa-users"></i> Utilizator
						</div>
						<div className="side-bar__item"
							onClick={() => UIModal.openModalAdmin()}
						>
							<i class="fa fa-lock"></i> Administrator
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default SideLeft;