import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {mapOptions} from './middleware/_mapStyles.js';
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
					{lat: 45.644883, lng: 25.595225, weight: 32},
					{lat: 45.644868, lng: 25.596046, weight: 22},
					{lat: 45.644968, lng: 25.596146, weight: 3},
					{lat: 45.645074, lng: 25.597183, weight: 123},
					{lat: 45.645304, lng: 25.597303, weight: 1323},
					{lat: 45.645307, lng: 25.598187, weight: 322},
					{lat: 45.645468, lng: 25.598911, weight: 302},
					{lat: 45.644906, lng: 25.598728, weight: 33},
					{lat: 45.644906, lng: 25.598728, weight: 55},
					{lat: 45.644906, lng: 25.598728, weight: 34},
					{lat: 45.644906, lng: 25.598728, weight: 566},

				],
			}
		}

	}

	render() {

		const heatMapData = {
			positions: this.state.heatMapTest.positions,
			options: {
				radius: 50,
				opacity: 0.6,
			}
		}

		console.log(heatMapData);

		return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyAn3ysSEdMxZ5Dp3y0TU6yWTSTxngIJmJ4' }}
				defaultCenter={this.props.center}
				defaultZoom={this.props.zoom}
				heatmapLibrary={true}
				heatmap={heatMapData}
				options={mapOptions}
			>
				{
					heatMapData.positions.map((item, index) => {
						return (
							<Marker
								key={index}
								lat={item.lat}
								lng={item.lng}
								name="My Marker"
								color="blue"
								visible={false}
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