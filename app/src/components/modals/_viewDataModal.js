import React, { Component } from "react";
import * as UIModal from "../../functions/iancu.openModal.js";
import ChartObject from "../middleware/Chart";

class ViewDataModal extends Component {
	render() {
		return (
				<div className="modal-overlay" data-modal="ViewDataModal">
					<div className="modal  modal--admin">
						<div className="modal__title">
							View Data
							<div
							className="modal__close--btn"
							onClick={(e) => {
								UIModal.closeModal(e, "ViewDataModal");
							}}
							>
							<i className="fa fa-times"></i>
							</div>
						</div>
						<div className="modal__wrapper">
							{this.props.dataNo2 ? (
							<ChartObject
								dateStart={this.props.dateStart}
								dateEnd={this.props.dateEnd}
								data={this.props.dataNo2}
								title={this.props.labelNo2}
								unit="µg/m³"
								limitWidth={this.props.limitWidth}
								average={this.props.averageNo2}
							/>
							) : (
							""
							)}
							{this.props.dataO3 ? (
							<ChartObject
								dateStart={this.props.dateStart}
								dateEnd={this.props.dateEnd}
								data={this.props.dataO3}
								title={this.props.labelO3}
								unit="µg/m³"
								limitWidth={this.props.limitWidth}
								average={this.props.averageO3}
							/>
							) : (
							""
							)}
							{this.props.dataMQ135 ? (
							<ChartObject
								dateStart={this.props.dateStartMQ}
								dateEnd={this.props.dateEndMQ}
								data={this.props.dataMQ135}
								title={this.props.labelMQ135}
								unit="Co2"
								limitWidth={this.props.limitWidth}
								average={this.props.averageMQ135}
							/>
							) : (
							""
							)}
							{this.props.air_temperature ? (
							<ChartObject
								dateStart={this.props.airDateStart}
								dateEnd={this.props.airDateEnd}
								data={this.props.air_temperature}
								title={this.props.air_label_temperature}
								unit=" C"
								limitWidth={this.props.limitWidth}
								average={this.props.air_averageTemperature}
							/>
							) : (
							""
							)}
							{this.props.air_humidity ? (
							<ChartObject
								dateStart={this.props.airDateStart}
								dateEnd={this.props.airDateEnd}
								data={this.props.air_humidity}
								title={this.props.air_label_humidity}
								unit="RH"
								limitWidth={this.props.limitWidth}
								average={this.props.air_averageHumidity}
							/>
							) : (
							""
							)}
							{this.props.air_dustDensity ? (
							<ChartObject
								dateStart={this.props.airDateStart}
								dateEnd={this.props.airDateEnd}
								data={this.props.air_dustDensity}
								title={this.props.air_label_dustdensity}
								unit="m3"
								limitWidth={this.props.limitWidth}
								average={this.props.air_averageDustDensity}
							/>
							) : (
							""
							)}
							{this.props.air_MQ135 ? (
							<ChartObject
								dateStart={this.props.airDateStart}
								dateEnd={this.props.airDateEnd}
								data={this.props.air_MQ135}
								title={this.props.air_label_MQ135}
								unit="Co2"
								limitWidth={this.props.limitWidth}
								average={this.props.air_averageMQ135}
							/>
							) : (
							""
							)}
						</div>
					</div>
				</div>
			);
	}
}

export default ViewDataModal;
