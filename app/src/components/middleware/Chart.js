import React, { Component } from 'react';
import { Chart } from "react-charts";

class ChartObject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: ""
		}
	}

	// componentDidMount() {
	// 	fetch(
	// 		"http://localhost:3001/data/opensource/openaq/100/"+dateStart+"/"+dateEnd
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			let no2PositionsArray = [];
	// 			let sum = 0;
	// 			data.no2.map((item, index) => {
	// 				no2PositionsArray.push({
	// 					lat: item.lat,
	// 					lng: item.lng,
	// 					weight: item.value
	// 				});
	// 				sum += item.value;
	// 			})

	// 			this.setState({
	// 				heatMapTest: {
	// 					positions: no2PositionsArray
	// 				},
	// 				averageNo2: (sum / data.no2.length).toFixed(3)
	// 			})
	// 		});
	// }

	render() {
		console.log(this.props.data);
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
					<Chart data={data} axes={axes} tooltip dark anitamtionEnabled="true" zoomEnabled="true"/>
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