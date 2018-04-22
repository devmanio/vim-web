import React, {Component} from "react";
import {withWrapper} from "create-react-server/wrapper";
import {connect} from "react-redux";
import ShowIf from "../common/ShowIf";
import {push} from "react-router-redux";
import './modal.css';

class Modal extends Component {

	ok() {
		this.props.dispatch({
			type: 'CLOSE_MODAL'
		});
		this.props.dispatch(push('/index'))
	}

	render() {
		return (
			<ShowIf show={this.props.show}>
				<div className={this.props.smallScreen ? 'small_modal' : ''}>
					<div className="container_modal">
						<div className="body_modal">
							<div className="title_modal">
								Registration complete
							</div>
							<div className="delimiter_modal"/>
							<div className="message_modal">
								Be sure to save your password (you see it just below). Do not tell anyone and do not lose it. It will
								not
								be possible to restore it.
							</div>
							<div className="hash_modal">
								{this.props.hash}
							</div>
							<button onClick={this.ok.bind(this)}>Ok</button>
						</div>
					</div>
				</div>
			</ShowIf>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		smallScreen: state.post.width <= 800,
		...state.modal
	}
};

export default withWrapper(connect(mapStateToProps)(Modal));