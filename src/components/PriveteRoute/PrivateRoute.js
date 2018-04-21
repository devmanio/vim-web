import React, {Component} from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";

class PrivateRoute extends Component {

	componentDidMount() {
		if (!this.props.isAuth) {
			this.props.dispatch(push('/login'))
		}
	}

	render() {
		const Component = this.props.component;
		if (this.props.isAuth) {
			return <Component {...this.props}/>;
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: !!state.login.user && !!state.login.postingKey
	}
};

export default connect(mapStateToProps)(PrivateRoute);