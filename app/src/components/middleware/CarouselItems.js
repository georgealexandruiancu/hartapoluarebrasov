import React, { Component } from 'react';

const carouselContainer = document.querySelector(".carousel-container");

class CarouselLeftArrow extends Component {
	render() {
		return (
			<a
				href="#"
				className="carousel__arrow carousel__arrow--left"
				onClick={this.props.onClick}
			>
				<span className="fa fa-2x fa-angle-left" />
			</a>
		);
	}
}

class CarouselRightArrow extends Component {
	render() {
			return (
				<a
					href="#"
					className="carousel__arrow carousel__arrow--right"
					onClick={this.props.onClick}
				>
					<span className="fa fa-2x fa-angle-right" />
				</a>
			);
	}
}

class CarouselIndicator extends Component {
	render() {
		return (
			<li>
					<a
					className={
						this.props.index == this.props.activeIndex
						? "carousel__indicator carousel__indicator--active"
						: "carousel__indicator"
					}
					onClick={this.props.onClick}
					/>
			</li>
		);
	}
}

class CarouselSlide extends Component {
	render() {
			return (
			<li
				className={
				this.props.index == this.props.activeIndex
					? "carousel__slide carousel__slide--active"
					: "carousel__slide"
				}
			>
				<div className="carousel__slide--item">
					<div className="carousel__slide--item-title">
						<i class="fas fa-chart-pie"></i>
						Zona: {this.props.slide.zone}
					</div>

					<div className="carousel__slide--item-value">
						<i class="fas fa-chart-pie"></i>
						{this.props.slide.data.name} - {this.props.slide.data.value} / {this.props.slide.data.currency}
					</div>

					<div className="carousel__slide--item-date">
						<i class="fa fa-calendar"></i>
						{this.props.slide.data.date} - last update
					</div>
				</div>
			</li>
			);
	}
}

// Carousel wrapper component
class Carousel extends Component {
	constructor(props) {
		super(props);

		this.goToSlide = this.goToSlide.bind(this);
		this.goToPrevSlide = this.goToPrevSlide.bind(this);
		this.goToNextSlide = this.goToNextSlide.bind(this);

		this.state = {
			activeIndex: 0,
			initialClientX: 0,
			finalClientX: 0,
		};
	}

	handleTouchStart(event) {
		this.setState({
			initialClientX: event.nativeEvent.touches[0].clientX
		});
		console.log(this.state);
	}

	handleTouchMove(event) {
		this.setState({
			finalClientX: event.nativeEvent.touches[0].clientX
		});
	}

	handleTouchEnd() {
		if ((this.state.finalClientX > this.state.initialClientX)
			&& (this.state.finalClientY - this.state.initialClientY < 10)) {
				console.log('swipe left')
		}
	
		this.setState({
			initialClientX: 0,
			finalClientX: 0
		});
	}

	goToSlide(index) {
		this.setState({
			activeIndex: index
		});
	}

	goToPrevSlide(e) {
		e.preventDefault();

		let index = this.state.activeIndex;
		let { slides } = this.props;
		let slidesLength = slides.length;

		if (index < 1) {
			index = slidesLength;
		}

		--index;

		this.setState({
			activeIndex: index
		});
	}

	goToNextSlide(e) {
		e.preventDefault();

		let index = this.state.activeIndex;
		let { slides } = this.props;
		let slidesLength = slides.length - 1;

		if (index === slidesLength) {
		index = -1;
		}

		++index;

		this.setState({
		activeIndex: index
		});
	}

 	 render() {
		return (
		<div className="carousel">
			<CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />

			<ul className="carousel__slides">
			{this.props.slides.map((slide, index) =>
				<CarouselSlide
					key={index}
					index={index}
					activeIndex={this.state.activeIndex}
					slide={slide}
					onDrag={() => this.handleTouchStart()}
				/>
			)}
			</ul>

			<CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

			<ul className="carousel__indicators">
			{this.props.slides.map((slide, index) =>
				<CarouselIndicator
				key={index}
				index={index}
				activeIndex={this.state.activeIndex}
				isActive={this.state.activeIndex==index} 
				onClick={e => this.goToSlide(index)}
				/>
			)}
			</ul>
		</div>
		);
	}
}

export default Carousel;