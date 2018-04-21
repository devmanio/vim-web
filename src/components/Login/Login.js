import React, {Component} from "react";
import Helmet from "../common/Helmet";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {login, registration} from "../../actions/login";
import ShowIf from "../common/ShowIf";
import './login.css';
import {getInfo, login1, registration1} from "../../services/eosio";

class Login extends Component {

	componentDidMount() {
		if (this.props.isAuth) {
			this.props.dispatch(push('/index'))
		}
	}

	login() {
		login1();
		//this.props.dispatch(login(this.name.value, this.password.value));
		//this.props.dispatch(push('/index'));
	}

	registration() {
		this.props.dispatch(registration(this.name.value));
	}

	render() {
		return (
			<div className="container_login">
				<Helmet title='Login'/>
				<ShowIf show={true}>
					<div className="error_login">
						Incorrect login
					</div>
				</ShowIf>
				<div className="form_login">
					<div className="title_login">
						WELCOME TO VIM
					</div>
					<input type="text" ref={ref => this.name = ref} maxLength={12}/>
					<input type="password" ref={ref => this.password = ref} minLength={51} maxLength={52}/>
					<button onClick={this.login.bind(this)}>Login</button>
					<div className="delimiter"/>
					<button onClick={this.registration.bind(this)}>Registration</button>
				</div>
				<div className="background_login"/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: !!state.auth.user && !!state.auth.postingKey
	}
};

export default connect(mapStateToProps)(Login);