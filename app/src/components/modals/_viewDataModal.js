import React, { Component } from 'react';
import * as UIModal from "../../functions/iancu.openModal.js";
import ChartObject from "../middleware/Chart";


class ViewDataModal extends Component {

	render() {
		console.log(this.props.dataNo2);
		return (
			<div className="modal-overlay" data-modal="ViewDataModal" >
				<div className="modal  modal--admin">
						<div className="modal__title">
							View Data
							<div className="modal__close--btn" onClick={(e) => { UIModal.closeModal(e, "ViewDataModal"); }}>
								<i className="fa fa-times"></i>
							</div>
						</div>
						<div className="modal__wrapper">
							{
								this.props.dataNo2 ? <ChartObject dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} data={this.props.dataNo2} title={this.props.labelNo2} unit="µg/m³" limitWidth={this.props.limitWidth} average={this.props.averageNo2} /> : ""
							}
							{
								this.props.dataO3 ? <ChartObject dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} data={this.props.dataO3} title={this.props.labelO3} unit="µg/m³" limitWidth={this.props.limitWidth} average={this.props.averageO3}/> : ""
							}
						</div>
					</div>
				</div>
		);
	}
}

export default ViewDataModal;