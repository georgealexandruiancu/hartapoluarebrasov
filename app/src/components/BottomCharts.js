import React, { Component } from 'react';
import ChartObject from "./middleware/Chart";

class BottomCharts extends Component {

	render() {
		return (
			<div className="bottom-charts">
				{
					this.props.dataNo2 ? <ChartObject dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} data={this.props.dataNo2} title={this.props.labelNo2} unit="µg/m³" limitWidth={this.props.limitWidth} average={this.props.averageNo2} /> : ""
				}
				{
					this.props.dataO3 ? <ChartObject dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} data={this.props.dataO3} title={this.props.labelO3} unit="µg/m³" limitWidth={this.props.limitWidth} average={this.props.averageO3} /> : ""
				}
				{
					this.props.dataMQ135 ? <ChartObject dateStart={this.props.dateStartMQ} dateEnd={this.props.dateEndMQ} data={this.props.dataMQ135} title={this.props.labelMQ135} unit="Co2" limitWidth={this.props.limitWidth} average={this.props.averageMQ135} /> : ""
				}
			</div>
		);
	}
}

export default BottomCharts;