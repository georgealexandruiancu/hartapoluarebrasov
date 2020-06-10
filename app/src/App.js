import React, { Component } from 'react';
import {BrowserRouter as Router , Route, Switch, Redirect} from 'react-router-dom';

import axios from "axios";

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

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
	}

	componentDidMount() {
		var instance = axios.create({
			withCredentials: true
		});

		instance.get("http://localhost:3001/users/who-am-i").then(response => {
			if (!response.data.user) {
				if (response.data) {
					if(Array.isArray(response.data)) {
						this.setState({
							loggedIn: true,
							user: response.data[0].user,
						});
					}
				}
				else {
					this.setState({ loggedIn: false });
				}
			}
			else {
				this.setState({ loggedIn: false });
			}
		});
	}

	render() {
		return (
			<Router>
				<div>
					<Switch>
						{
							this.state.loggedIn ? (
								<>
									<Redirect to="/" />
									<Route exact path="/" component={UserDashboard} />
									<Route path="/dashboard" component={UserDashboard} user={this.state.user}/>
								</>
							) : (
								<>
									<Route exact path="/" component={HomepageNoLogin} />
									<Route path="/login" component={UserLogin} />
									<Route path="/register" component={UserRegister} />
									<Route path="/confirm-register" component={UserConfirmation} />
									<Route component={HomepageNoLogin} />
								</>
							)
						}

					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;