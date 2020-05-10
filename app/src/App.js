import React, { Component } from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';

// import MapContainer from './components/MapContainer';
// import Header from './components/Header';
// import SideLeft from './components/SideLeft';
// import BottomCarousel from './components/BottomCarousel';
// import ModalAdmin from './components/ModalAdmin';
// import ModalUser from './components/ModalUser';
import UserLogin from "./components/login/UserLogin";
import UserRegister from "./components/login/UserRegister";
import UserConfirmation from "./components/login/UserRegisterConfirmation";
import HomepageNoLogin from "./components/Homepage";
import UserDashboard from "./components/DashboardUser";


import './styles/style.min.css';

class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={HomepageNoLogin} />
						<Route path="/login" component={UserLogin} />
						<Route path="/register" component={UserRegister} />
						<Route path="/confirm-register" component={UserConfirmation} />
						<Route path="/dashboard" component={UserDashboard} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;