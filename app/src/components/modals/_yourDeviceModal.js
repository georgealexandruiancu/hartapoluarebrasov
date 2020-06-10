import React, { Component } from 'react';
import * as UIModal from "../../functions/iancu.openModal.js";
import ChartObject from "../middleware/Chart";
import axios from "axios";

class ViewDataModal extends Component {

	componentDidMount() {
		var instance = axios.create({
			withCredentials: true
		});

		instance.get("http://localhost:3001/users/who-am-i").then(response => {
			if (!response.data.user) {
				if (response.data) {
					if(Array.isArray(response.data)) {
						this.setState({
							user: response.data[0].user,
						});
						console.log(response.data);
					}
				}
			}
		});
	}

	render() {
		return (
			<div className="modal-overlay" data-modal="YourDeviceModal" >
				<div className="modal  modal--admin">
						<div className="modal__title">
							View Data
							<div className="modal__close--btn" onClick={(e) => { UIModal.closeModal(e, "YourDeviceModal"); }}>
								<i className="fa fa-times"></i>
							</div>
						</div>
						<div className="modal__wrapper">

						</div>
					</div>
				</div>
		);
	}
}

export default ViewDataModal;