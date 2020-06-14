import React, { Component } from "react";

import MapContainer from "./MapContainer";
import Header from "./Header";
import SideLeft from "./SideLeft";
import BottomCharts from "./BottomCharts";
import ViewDataModal from "./modals/_viewDataModal";
import YourDeviceModal from "./modals/_yourDeviceModal";

class DashboardUser extends Component {

		constructor (props) {
		super(props);
		this.state = {
			heatMapTest: "",
			dateStart: "",
			dateEnd: "",
			errorOnAir: false,
			toggleMarkers: false
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

	_removeDuplicatesPositions = (things) => {
		things = things.filter((thing, index, self) =>
			index === self.findIndex((t) => (
				t.lat === thing.lat && t.lng === thing.lng
			))
		);

		things = things.filter(function (thing) {
			return thing !== thing;
		});

		return things
	}

	_onToggleMarkers = () => {
		this.setState({
			toggleMarkers: !this.state.toggleMarkers
		})
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
					positionsArray: no2PositionsArray,
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


				try {
					this.setState({
						mq135Data,
						dateStartMQ: data.data[0].timestamp.substring(0, 10),
						dateEndMQ: data.data[data.data.length - 1].timestamp.substring(0, 10),
						averageMQ135: sum135 / data.data.length,
					});
				}
				catch(e) {
					console.log(e);
					return;
				}
			});

		fetch(
			"http://localhost:3001/data/get-all-data"
		)
			.then((response) => response.json())
			.then((data) => {
				let positions = [];
				let airTemperature = [];
				let airHumidity = [];
				let airDustDensity = [];
				let airMQ135 = [];
				let airDateStart, airDateEnd, averageTemperature = 0, averageHumidity = 0, averageDustDensity = 0, averageMQ135 = 0;

				let sum135 = 0;
				data.data.map((item, index) => {

					try {
						airDateStart = data.data[0]._source.timestamp.substring(0, 10);
						airDateEnd = data.data[data.data.length - 1]._source.timestamp.substring(0, 10);
					}
					catch (e) {
						console.log(e);
						this.setState({errorOnAir: true});
						return;
					}

					positions.push({
						lat: item._source.lng,
						lng: item._source.lat,
						weight: item._source.temperature,
					});

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
						airDateEnd,
						positions
					},
					heatMapTest: {
						positions: [
							...positions,
							...this.state.positionsArray
						]
					}
				}, () => {
					console.log(this.state);
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
			<div className="buttons-control-map  u-pos-fixed  u-pos--top-gutter  u-pos--right-gutter  u-z-index--above-max">
				<button onClick={() => this._onToggleMarkers() }>toggle maps markers</button>
			</div>
			<div className="map-container  u-pos-fixed">
				{
					this.state.heatMapTest !== "" ? <MapContainer heatMapData={this.state.heatMapTest} toggleMarkers={this.state.toggleMarkers} /> : ""
				}
			</div>
			{
				<YourDeviceModal
					user={this.props.user}
				/>
			}
			{
				this.state.no2Data && this.state.o3Data && this.state.air && !this.state.errorOnAir ? <ViewDataModal
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
					air_temperature={this.state.air.temperature}
					air_humidity={this.state.air.humidity}
					air_dustDensity={this.state.air.dustDensity}
					air_MQ135={this.state.air.MQ135}
					air_averageTemperature={this.state.air.averageTemperature}
					air_averageHumidity={this.state.air.averageHumidity}
					air_averageDustDensity={this.state.air.averageDustDensity}
					air_averageMQ135={this.state.air.averageMQ135}
					airDateStart={this.state.air.airDateStart}
					airDateEnd={this.state.air.airDateStart}
					air_label_temperature="Temperature"
					air_label_humidity="Humidity"
					air_label_dustdensity="Dust Density"
					air_label_MQ135="MQ135"
				/> : ""
			}
			{
				this.state.no2Data && this.state.o3Data && this.state.air && !this.state.errorOnAir ? <BottomCharts
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
					air_temperature={this.state.air.temperature}
					air_humidity={this.state.air.humidity}
					air_dustDensity={this.state.air.dustDensity}
					air_MQ135={this.state.air.MQ135}
					air_averageTemperature={this.state.air.averageTemperature}
					air_averageHumidity={this.state.air.averageHumidity}
					air_averageDustDensity={this.state.air.averageDustDensity}
					air_averageMQ135={this.state.air.averageMQ135}
					airDateStart={this.state.air.airDateStart}
					airDateEnd={this.state.air.airDateStart}
					air_label_temperature="Temperature"
					air_label_humidity="Humidity"
					air_label_dustdensity="Dust Density"
					air_label_MQ135="MQ135"
				/> : ""
			}
		</div>
		);
	}
}
export default DashboardUser;
