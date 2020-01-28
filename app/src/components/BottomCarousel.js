import React, { Component } from 'react';
import Carousel from './middleware/CarouselItems.js';
import * as UI from '../functions/iancu.toggle.js';

// Data for carousel
const carouselSlidesData = [
	{
		index: 1,
		zone: "Astra",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "NO2",
			percent: -2,
			_entryID: "123dasde12easd12"
		}
	}, {
		zone: "Gemenii",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "CO2",
			percent: 5,
			_entryID: "123dasde12easd12"
		}
	}, {
		zone: "Livada Postei",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "NO",
			percent: -3,
			_entryID: "123dasde12easd12"
		}
	}, {
		zone: "Gemenii",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "O3",
			percent: 3,
			_entryID: "123dasde12easd12"
		}
	}, {
		zone: "Gemenii",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "O3",
			percent: 3,
			_entryID: "123dasde12easd12"
		}
	}, {
		zone: "Gemenii",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "O3",
			percent: 3,
			_entryID: "123dasde12easd12"
		}
	}, {
		zone: "Gemenii",
		author: "Alex Iancu",
		data: {
			value: "33.33",
			currency: "ppm",
			date: "22/2/2020",
			name: "O3",
			percent: 3,
			_entryID: "123dasde12easd12"
		}
	},
];

class BottomCarousel extends Component {

	render() {
		return (
			<div className="container__row">
				<Carousel slides={carouselSlidesData}/>
			</div>
		);
	}
}

export default BottomCarousel;