import React, { Component } from 'react';
import { Chart } from "react-charts";

class ChartObject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: ""
		}
	}

	primaryCursor = () => ({
		render: props => (
			<span style={{ fontSize: '1rem' }}>
			<span role="img" aria-label="icon">
				🕑
			</span>{' '}
			{(props.formattedValue || '').toString()}
			</span>
		)
	})


	secondaryCursor = () => ({
		render: props => (
			<span style={{ fontSize: '1rem' }}>
			<span role="img" aria-label="icon">
				👍
			</span>{' '}
			{(props.formattedValue || '').toString()}
			</span>
		)
	})

	render() {
		let data = [
			{
				xValueFormatString: "MMM YYYY",
				data: this.props.data,
				type: "line",
			},
		];
		console.log(this.props.data);
		let axes = [
			{ primary: true, type: 'utc', position: 'bottom' },
			{ type: 'linear', position: 'left' }
		];

		return (
			Array.isArray(data) && data[0].data.length > 0 ? (
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
						<Chart zoomEnabled={true} data={data} axes={axes} tooltip dark animationEnabled="true" zoomEnabled="true" primaryCursor={this.primaryCursor}
          secondaryCursor={this.secondaryCursor} />
					</div>
					<div className="chart-holder__footer">
						Average between {this.props.dateStart} - {this.props.dateEnd} : {this.props.average} <br/>
						Last value registered: {this.props.data[this.props.data.length - 1].y + " " + this.props.unit}
					</div>
				</div>
			) : ""
		);
	}
}

export default ChartObject;