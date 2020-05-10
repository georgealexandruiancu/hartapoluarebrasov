import React, { Component } from "react";

import MapContainer from "./MapContainer";
import Header from "./Header";
import SideLeft from "./SideLeft";
import BottomCharts from "./BottomCharts";
import ViewDataModal from "./modals/_viewDataModal";

class DashboardUser extends Component {

		constructor (props) {
		super(props);
		this.state = {
			heatMapTest: "",
			dateStart: "",
			dateEnd: ""
		}

	}

	getDates() {
		let d = new Date();
		let myDay = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
		let myDayMonth =
		d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
		let myDayYear = d.getFullYear();

		let lastDay = new Date(Date.now() - 864e5).getDate();
		let lastDayMonth =
		new Date(Date.now() - 864e5).getMonth() + 1 < 10
			? "0" + (new Date(Date.now() - 864e5).getMonth() + 1)
			: new Date(Date.now() - 864e5).getMonth() + 1;
		let lastDayYear = new Date(Date.now() - 864e5).getFullYear();
		lastDay = lastDay < 10 ? "0" + lastDay : lastDay;

		let dateStart = lastDayYear + "-" + lastDayMonth + "-" + lastDay;
		let dateEnd = myDayYear + "-" + myDayMonth + "-" + myDay;

		this.setState({
			dateStart,
			dateEnd
		});

		return {
			dateStart,
			dateEnd
		}
	}

	componentDidMount() {

		let dateStart = this.getDates().dateStart;
		let dateEnd = this.getDates().dateEnd;

		fetch(
			"http://localhost:3001/data/opensource/openaq/100/"+dateStart+"/"+dateEnd
		)
			.then((response) => response.json())
			.then((data) => {
				let no2PositionsArray = [], o3PositionsArray = [];
				let no2Data = [], o3Data = [];
				let sum = 0;
				let sumO3 = 0;

				data.no2.map((item, index) => {
					no2PositionsArray.push({
						lat: item.lat,
						lng: item.lng,
						weight: item.value
					});
					no2Data.push({
						x: new Date(item.date_reg),
						y: item.value.toFixed(3),
					});
					sum += item.value;
				})

				data.o3.map((item, index) => {
					o3PositionsArray.push({
						lat: item.lat,
						lng: item.lng,
						weight: item.value
					});
					o3Data.push({
						x: new Date(item.date_reg),
						y: item.value.toFixed(3),
					});
					sumO3 += item.value;
				})

				this.setState({
					heatMapTest: {
						positions: no2PositionsArray
					},
					averageNo2: (sum / data.no2.length).toFixed(3),
					averageO3: (sumO3 / data.o3.length).toFixed(3),
					no2Data,
					o3Data
				})
			});
	}
	render() {
		return (
		<div className="root">
			<div className="container  title-container">
				<Header />
			</div>
			<div className="side-container  side-container--left">
				<SideLeft />
			</div>
			<div className="map-container  u-pos-fixed">
				{
					this.state.heatMapTest !== "" ? <MapContainer heatMapData={this.state.heatMapTest} /> : ""
				}
			</div>
			{
				this.state.no2Data && this.state.o3Data ? <ViewDataModal
					dateStart={this.state.dateStart}
					dateEnd={this.state.dateEnd}
					dataNo2={this.state.no2Data}
					labelNo2="No2"
					limitWidth={false}
					dataO3={this.state.o3Data}
					labelO3="O3"
					averageNo2={this.state.averageNo2}
					averageO3={this.state.averageO3}
				/> : ""
			}
			{
				this.state.no2Data && this.state.o3Data ? <BottomCharts
					dateStart={this.state.dateStart}
					dateEnd={this.state.dateEnd}
					dataNo2={this.state.no2Data}
					labelNo2="No2"
					limitWidth={true}
					dataO3={this.state.o3Data}
					labelO3="O3"
					averageNo2={this.state.averageNo2}
					averageO3={this.state.averageO3}
				/> : ""
			}
		</div>
		);
	}
}
export default DashboardUser;
