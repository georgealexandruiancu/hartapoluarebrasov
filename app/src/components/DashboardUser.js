import React, { Component } from "react";

import MapContainer from "./MapContainer";
import Header from "./Header";
import SideLeft from "./SideLeft";
import BottomCharts from "./BottomCharts";

class App extends Component {
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
				<MapContainer />
			</div>
			<BottomCharts />
		</div>
		);
	}
}
export default App;
