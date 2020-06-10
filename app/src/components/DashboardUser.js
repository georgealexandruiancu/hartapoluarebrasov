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

		fetch(
			"http://localhost:3001/data/get-all-data/mq135"
		)
			.then((response) => response.json())
			.then((data) => {
				let mq135Data = [];
				let sum135 = 0;
				data.data.map((item, index) => {
					mq135Data.push({
						x: new Date(item.timestamp),
						y: item.MQ135
					});
					sum135 += item.MQ135
				});


				this.setState({
					mq135Data,
					dateStartMQ: data.data[0].timestamp.substring(0, 10),
					dateEndMQ: data.data[data.data.length - 1].timestamp.substring(0, 10),
					averageMQ135: sum135 / data.data.length
				})
			});

		fetch(
			"http://localhost:3001/data/get-all-data"
		)
			.then((response) => response.json())
			.then((data) => {
				let airTemperature = [];
				let airHumidity = [];
				let airDustDensity = [];
				let airMQ135 = [];
				let airDateStart, airDateEnd, averageTemperature = 0, averageHumidity = 0, averageDustDensity = 0, averageMQ135 = 0;

				let sum135 = 0;
				data.data.map((item, index) => {
					airDateStart = data.data[0]._source.timestamp.substring(0, 10);
					airDateStart = data.data[data.data.length - 1]._source.timestamp.substring(0, 10);

					airTemperature.push({
						x: new Date(item._source.timestamp),
						y: item._source.temperature
					});

					averageTemperature += item._source.temperature;

					airHumidity.push({
						x: new Date(item._source.timestamp),
						y: item._source.humidity
					});

					averageHumidity += item._source.humidity;

					airDustDensity.push({
						x: new Date(item._source.timestamp),
						y: item._source.dustDensity
					});

					averageDustDensity += item._source.dustDensity;

					airMQ135.push({
						x: new Date(item._source.timestamp),
						y: item._source.MQ135
					});

					averageMQ135 += item._source.MQ135;
				});

				this.setState({
					air: {
						temperature: airTemperature,
						humidity: airHumidity,
						dustDensity: airDustDensity,
						MQ135: airMQ135,
						averageTemperature: averageTemperature / data.data.length,
						averageHumidity: averageHumidity / data.data.length,
						averageDustDensity: averageDustDensity / data.data.length,
						averageMQ135: averageMQ135 / data.data.length,
						airDateStart,
						airDateEnd
					},
				});
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
					dateStartMQ={this.state.dateStartMQ}
					dateEndMQ={this.state.dateEndMQ}
					dataMQ135={this.state.mq135Data}
					labelMQ135="Sensor: MQ135"
					averageMQ135={this.state.averageMQ135}
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
					dateStartMQ={this.state.dateStartMQ}
					dateEndMQ={this.state.dateEndMQ}
					dataMQ135={this.state.mq135Data}
					labelMQ135="Sensor: MQ135"
					averageMQ135={this.state.averageMQ135}
				/> : ""
			}
		</div>
		);
	}
}
export default DashboardUser;
