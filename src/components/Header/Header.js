import React, {Component} from "react";
import {connect} from "react-redux";
import {withWrapper} from "create-react-server/wrapper";
import './header.css';
import {createPost} from "../../actions/post";
import {logout} from "../../actions/login";
import ShowIf from "../common/ShowIf";

class Header extends Component {

	constructor(props) {
		super(props);
		this.resizeWindow = this.resizeWindow.bind(this);
	}

	imageChanged(event) {
		event.preventDefault();
		this.props.dispatch(createPost(event.target.files[0]));
	}

	componentDidMount() {
		window.addEventListener('resize', this.resizeWindow);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeWindow);
	}

	resizeWindow() {
		this.props.dispatch({
			type: 'RESIZE_WINDOW'
		})
	}

	logout() {
		this.props.dispatch(logout())
	}

	openSend() {
		this.props.dispatch({
			type: 'OPEN_SEND'
		})
	}

	closeSend() {
		this.props.dispatch({
			type: 'CLOSE_SEND'
		})
	}

	render() {
		return (
			<div className={!this.props.showSend ? ' show-send' : ''}>
				<div className={this.props.smallScreen ? 'small-screen' : ''}>
					<div className={"container_header "}>
						<ShowIf show={this.props.authorized}>
							<div className="main_header">
								<div className="user-info_header">
									<div className="name_header">
										{this.props.user}
									</div>
									<div className="balance_header">
										{this.props.money}
									</div>
								</div>
								<div className="logout_header" onClick={this.logout.bind(this)}>
									<div className="logout-img_header"/>
								</div>
								<ShowIf show={!this.props.showSend}>
									<div className="sen_header" onClick={this.openSend.bind(this)}/>
								</ShowIf>
								<ShowIf show={this.props.showSend}>
									<div className="clo_header" onClick={this.closeSend.bind(this)}/>
								</ShowIf>
								<button className="create_header">
									<input type="file"
												 className="input-img_header"
												 accept="image/*"
												 onChange={this.imageChanged.bind(this)}/>
									Upload photo
								</button>
							</div>
							<ShowIf show={this.props.showSend && this.props.smallScreen && this.props.authorized}>
								<div className="sen-con_header">
									<div className="name_header">
										{this.props.user}
									</div>
									<div className="balance_header">
										{this.props.money}
									</div>
									<button className="logout-btn_header">Logout</button>
								</div>
							</ShowIf>
						</ShowIf>
						<div className="logo_header"/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		showSend: state.post.openedSend,
		smallScreen: state.post.width <= 800,
		...state.login,
		user: 'test user',
		money: '0.34243 VIM',
		authorized: state.login.user && state.login.userId && state.login.postingKey
	};
};

export default withWrapper(connect(mapStateToProps)(Header));