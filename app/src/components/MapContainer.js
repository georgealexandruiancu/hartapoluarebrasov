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
		}
	}

	render() {

		const heatMapData = {
			positions: this.props.heatMapData.positions,
			options: {
				radius: 30,
				opacity: 0.6,
				maxIntensity: 300,
				dissipating: true
			}
		}

		return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyAn3ysSEdMxZ5Dp3y0TU6yWTSTxngIJmJ4' }}
				defaultCenter={this.props.center}
				defaultZoom={this.props.zoom}
				heatmapLibrary={true}
				heatmap={heatMapData}
				options={mapOptions}
				maxIntensity={1000}
			>
				{
					heatMapData.positions.map((item, index) => {
						return (
							<Marker
								key={index}
								lat={item.lat}
								lng={item.lng}
								name="Test"
								color="transparent"
								visible={true}
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