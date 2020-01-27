import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import Header from './components/Header';

import './styles/style.css';

class App extends Component {

	render() {
		return (
			<div className="root">
				<div className="container  title-container">
					<Header />
				</div>
				<div className="map-container  u-pos-fixed">
					<MapContainer />
				</div>
				

			</div>
		);
	}
}

export default App;