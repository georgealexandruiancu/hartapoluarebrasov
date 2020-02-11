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
import HomepageNoLogin from "./components/Homepage";



import './styles/style.css';

class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={HomepageNoLogin} />
						<Route path="/login" component={UserLogin} />
						<Route path="/register" component={UserRegister} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;