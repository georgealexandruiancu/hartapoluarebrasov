import React, { Component } from 'react';
import { Chart } from "react-charts";

class BottomCharts extends Component {

	render() {
		let data = [
			{
				label: 'Series 1',
				data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7], [5, 1], [6, 2], [7, 4], [8, 2], [9, 7]]
			}
		];
		let axes = [
			{ primary: true, type: 'linear', position: 'bottom' },
			{ type: 'linear', position: 'left' }
		];

		return (
			<div className="bottom-charts">
					<div
						className="chart-holder"
						style={{
							width: '350px',
							marginTop: "20px",
							paddingLeft: "20px"
						}}
					>
						<div className="chart-holder__title">
							Temperature
						</div>
						<div style={{height: '150px'}}>
							<Chart data={data} axes={axes} tooltip series={{type: 'bar'}} dark />
						</div>
						<div className="chart-holder__footer">
							Last value registered: 23 C
						</div>
					</div>
					<div
						className="chart-holder"
						style={{
							width: '350px',
							marginTop: "20px",
							paddingLeft: "20px"
						}}
					>
						<div className="chart-holder__title">
							Temperature
						</div>
						<div style={{height: '150px'}}>
							<Chart data={data} axes={axes} tooltip series={{type: 'bar'}} dark />
						</div>
						<div className="chart-holder__footer">
							Last value registered: 23 C
						</div>
					</div>
					<div
						className="chart-holder"
						style={{
							width: '350px',
							marginTop: "20px",
							paddingLeft: "20px"
						}}
					>
						<div className="chart-holder__title">
							Temperature
						</div>
						<div style={{height: '150px'}}>
							<Chart data={data} axes={axes} tooltip series={{type: 'bar'}} dark />
						</div>
						<div className="chart-holder__footer">
							Last value registered: 23 C
						</div>
					</div>
					<div
						className="chart-holder"
						style={{
							width: '350px',
							marginTop: "20px",
							paddingLeft: "20px"
						}}
					>
						<div className="chart-holder__title">
							Temperature
						</div>
						<div style={{height: '150px'}}>
							<Chart data={data} axes={axes} tooltip series={{type: 'bar'}} dark />
						</div>
						<div className="chart-holder__footer">
							Last value registered: 23 C
						</div>
					</div>
					<div
						className="chart-holder"
						style={{
							width: '350px',
							marginTop: "20px",
							paddingLeft: "20px"
						}}
					>
						<div className="chart-holder__title">
							Temperature
						</div>
						<div style={{height: '150px'}}>
							<Chart data={data} axes={axes} tooltip series={{type: 'bar'}} dark />
						</div>
						<div className="chart-holder__footer">
							Last value registered: 23 C
						</div>
					</div>
			</div>
		);
	}
}

export default BottomCharts;