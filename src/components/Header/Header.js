import React, {Component} from "react";
import {connect} from "react-redux";
import {withWrapper} from "create-react-server/wrapper";
import './header.css';
import {createPost} from "../../actions/post";
import {logout} from "../../actions/login";
import ShowIf from "../common/ShowIf";

class Header extends Component {

	imageChanged(event) {
		event.preventDefault();
		this.props.dispatch(createPost(event.target.files[0]));
	}

	logout() {
		this.props.dispatch(logout())
	}

	render() {
		return (
			<div className="container_header">
				<ShowIf show={this.props.authorized}>
					<div className="user-info_header">
						<div className="name_header">
							Nina Robbins
						</div>
						<div className="balance_header">
							$2345
						</div>
					</div>
					<div className="logout_header" onClick={this.logout.bind(this)}>
						<div className="logout-img_header"/>
					</div>
					<button className="create_header">
						<input type="file"
									 className="input-img_header"
									 accept="image/*"
									 onChange={this.imageChanged.bind(this)}/>
						Upload photo
					</button>
				</ShowIf>
				<div className="logo_header"/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authorized: state.auth.user && state.auth.userId && state.auth.postingKey
	}
};

export default withWrapper(connect(mapStateToProps)(Header));