import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import Header from './components/Header';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import BottomCarousel from './components/BottomCarousel';
import ModalAdmin from './components/ModalAdmin';
import ModalUser from './components/ModalUser';

import './styles/style.css';

class App extends Component {

	render() {
		return (
			<div className="root" style={{position: 'relative'}}>
				<ModalAdmin />
				<ModalUser />
				<div className="container  title-container">
					<Header />
				</div>
				<div className="side-container  side-container--left">
					<SideLeft />
				</div>
				<div className="map-container  u-pos-fixed">
					<MapContainer />
				</div>
				<div className="side-container  side-container--right">
					<SideRight />
				</div>
				<div className="container--fluid  bottom-carousel">
					<BottomCarousel />
				</div>
			</div>
		);
	}
}

export default App;