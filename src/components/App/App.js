import React, {Component} from "react";
import {connect} from "react-redux";
import {withWrapper} from "create-react-server/wrapper";
import './app.css';
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import Spinner from "../Spiner/Spinner";

class App extends Component {

	render() {
		return (
			<div className="main_app">
				<Header />
				<div className="body_app">
					{this.props.children}
				</div>
				<Modal />
				<Spinner />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
};

export default withWrapper(connect(mapStateToProps)(App));