import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './middleware/Marker';

class MapContainer extends Component {
	static defaultProps = {
		center: {
		lat: 45.6523093,
		lng: 25.6102746
		},
		zoom: 13
	};

	constructor (props) {
		super(props);
		this.state = {
			heatMapTest: {
				positions: [
					{lat: 45.6523093, lng: 25.6122746},
					{lat: 45.6423093, lng: 25.6145746},
					{lat: 45.6453093, lng: 25.6132746},
					{lat: 45.6473093, lng: 25.6133746}
				],
			}
		}
	}

	render() {

		const heatMapData = {
			positions: this.state.heatMapTest.positions,
			options: {
				radius: 30,
				opacity: 0.6
			}
		}

		console.log(heatMapData);

		return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyAssHpNB_Hpj_hFKudAalPultvahAojIng' }}
				defaultCenter={this.props.center}
				defaultZoom={this.props.zoom}
				heatmapLibrary={true}
				heatmap={heatMapData}
			>
				{
					heatMapData.positions.map((item, index) => {
						return (
							<Marker
								lat={item.lat}
								lng={item.lng}
								name="My Marker"
								color="blue"
							/>
						)
					})
				}
			</GoogleMapReact>
		</div>
		);
	}
}

export default MapContainer;