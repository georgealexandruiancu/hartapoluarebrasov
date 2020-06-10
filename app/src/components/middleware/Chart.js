import React, { Component } from 'react';
import { Chart } from "react-charts";

class ChartObject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: ""
		}
	}

	render() {
		let data = [
			{
				xValueFormatString: "MMM YYYY",
				data: this.props.data,
				type: "line",
			},
		];
		let axes = [
			{ primary: true, type: 'utc', position: 'bottom' },
			{ type: 'linear', position: 'left' }
		];

		return (
			<div
				className={"chart-holder  "+ (this.props.limitWidth !== true ? "chart-holder--block" : "") }
				style={this.props.limitWidth === true ? {
							width: '350px',
							marginTop: "20px",
							paddingLeft: "20px"
						} : {}}
			>
				<div className="chart-holder__title">
					{this.props.title}
				</div>
				<div style={{height: '150px'}}>
					<Chart data={data} axes={axes} tooltip dark animationEnabled="true" zoomEnabled="true"/>
				</div>
				<div className="chart-holder__footer">
					Average between {this.props.dateStart} - {this.props.dateEnd} : {this.props.average} <br/>
					Last value registered: {this.props.data[this.props.data.length - 1].y + " " + this.props.unit}
				</div>
			</div>
		);
	}
}

export default ChartObject;