import React, { Component } from 'react';

class ModalAdmin extends Component {

	closeModal () {
		var modalAdmin = document.getElementsByClassName("js-open-modal-admin")[0];
		modalAdmin.classList.remove("modal-overlay--open");
	}

	render() {
		return (
			<div className="modal-overlay  js-open-modal-admin">
				<div className="modal  modal--admin">
					<div className="modal__wrapper">
						<div className="modal__title">
							Administrator LOGIN
							<div className="modal__close--btn  js-close-modal-admin" onClick={() => this.closeModal()}>
								<i className="fa fa-times"></i>
							</div>
						</div>
						<div className="modal__form">
							<div className="modal__form--input">
								<input type="text" name="_emailAdmin" placeholder="Enter your email.." />
							</div>
							<div className="modal__form--input">
								<input type="password5" name="_passwordAdmin" placeholder="Enter your password.." />
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

export default ModalAdmin;