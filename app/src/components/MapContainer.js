import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {mapOptions} from './middleware/_mapStyles.js';
import Marker from './middleware/Marker';
import Circle from "./middleware/Circle";

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
			toggleMarkers: this.props.toggleMarkers
		}
	}

	drawCircle(map, maps) {
		 new maps.Circle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.3,
			map,
			center: { lat: this.props.center.lat, lng: this.props.center.lng },
			radius: 275,
		});
	}

	drawHeatmaps(map, maps, heats) {
		let prepareHeatMap = [];
		heats.positions.map((item, index) => {
			prepareHeatMap.push(
				{
					location: new maps.LatLng(item.lat, item.lng),
					weight: item.weight
				}
			);
		});

		var heatmap = new maps.visualization.HeatmapLayer({
			data: prepareHeatMap,
		});
		heatmap.setMap(map);
	}

	makeThisGlobal(map, maps) {
		this.setState({
			map,
			maps
		})
	}

	drawMarkers(map, maps, heats) {
		heats.positions.map((item, index) => {
			let marker = new maps.Marker({
				position: {
					lat: item.lat,
					lng: item.lng
				},
				title: item.lat + ", " + item.lng,
			});

			// To add the marker to the map, call setMap();
			marker.setMap(map);
		});
	}

	render() {

		const heatMapData = {
			positions: this.props.heatMapData.positions,
			options: {
				radius: 1000,
				opacity: 0.6,
				maxIntensity: 20,
				dissipating: false
			}
		}

		return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyAn3ysSEdMxZ5Dp3y0TU6yWTSTxngIJmJ4' }}
				defaultCenter={this.props.center}
				defaultZoom={this.props.zoom}
				heatmapLibrary={true}
				// heatmap={heatMapData}
				options={mapOptions}
				onGoogleApiLoaded={({ map, maps }) => {
						this.makeThisGlobal(map, maps);
						this.drawCircle(map, maps);
						this.drawHeatmaps(map, maps, heatMapData);
						if (this.state.toggleMarkers == true) {
							this.drawMarkers(map, maps, heatMapData);
						}
					}
				}
			>
			</GoogleMapReact>
		</div>
		);
	}
}

export default MapContainer;