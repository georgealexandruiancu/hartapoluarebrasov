import React, { Component } from 'react';

class Header extends Component {

	render() {
		return (
			<div className="container__row">
				<div className="container__col-4  title-container__icon">
					<i class="fa fa-info-circle"></i>
				</div>
				<div className="container__col-4  title-container__text">
					Harta Poluare Brasov
				</div>
				<div className="container__col-4  title-container__icon  title-container__icon--alt">
					<i class="fa fa-cogs"></i>
				</div>
			</div>
		);
	}
}

export default Header;