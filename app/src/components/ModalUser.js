import React, { Component } from 'react';

import * as UIModal from "../functions/iancu.openModal";

class ModalUser extends Component {

	render() {
		return (
			<div className="modal-overlay  js-open-modal-user">
				<div className="modal  modal--admin">
					<div className="modal__wrapper">
						<div className="modal__title">
							Utilizator LOGIN
							<div className="modal__close--btn  js-close-modal-user" onClick={() => UIModal.closeModalUser()}>
								<i className="fa fa-times"></i>
							</div>
						</div>
						<div className="modal__form">
							<div className="modal__form--input">
								<input type="text" name="_emailUser" placeholder="Enter your email.." />
							</div>
							<div className="modal__form--input">
								<input type="password" name="_passwordUser" placeholder="Enter your password.." />
							</div>
							<div className="modal__form--input">
								<button class="btn__primary">Log In</button>
							</div>
						</div>
						<div className="modal__bottom">

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ModalUser;