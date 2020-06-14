import React, { Component } from 'react';
import * as UIModal from "../../functions/iancu.openModal.js";
import ChartObject from "../middleware/Chart";
import axios from "axios";

class ViewDataModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userLoaded: false
		}
	}

	componentDidMount() {
		var instance = axios.create({
			withCredentials: true
		});

		instance.get("http://localhost:3001/users/who-am-i").then(response => {
			if (!response.data.user) {
				if (response.data) {
					if(Array.isArray(response.data)) {
						this.setState({
							user: response.data[0]._source,
							userLoaded: true
						}, () => {
							console.log(this.state.user);
							this._GetUserData();
						});
					}
				}
			}
		});
	}

	_GetUserData() {
		fetch(
			"http://localhost:3001/data/get-my-data/" + this.state.user.deviceId
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// this.setState({
				// 	user: {
				// 		data
				// 	}
				// })
			});
	}

	render() {
		return (
			this.state.userLoaded ?
			(
			<div className="modal-overlay" data-modal="YourDeviceModal" >
				<div className="modal  modal--admin">
						<div className="modal__title">
							View Data
							<div className="modal__close--btn" onClick={(e) => { UIModal.closeModal(e, "YourDeviceModal"); }}>
								<i className="fa fa-times"></i>
							</div>
						</div>
						<div className="modal__wrapper">
							<h4>
								User: {this.state.user.name}
							</h4>
							<h4>
								Email: {this.state.user.email}
							</h4>
							<h4>
								Device Hash: {this.state.user.deviceId}
							</h4>
							<h4> Your device query: </h4>
							<pre>
								{"http://localhost:3001/data/get-my-data/" + this.state.user.deviceId}
							</pre>
						</div>
					</div>
				</div>
			) : ""
		);
	}
}

export default ViewDataModal;