import React, {Component} from "react";
import {connect} from "react-redux";
import {withWrapper} from "create-react-server/wrapper";
import {RingLoader} from 'react-spinners';
import './spinner.css';
import ShowIf from "../common/ShowIf";

class Spinner extends Component {

	render() {
		return (
			<ShowIf show={this.props.loading}>
				<div className="container_spinner">
					<RingLoader
						color={'#123abc'}
						loading={true}
					/>
				</div>
			</ShowIf>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.login.login || state.login.logout || state.post.creating
	}
};

export default withWrapper(connect(mapStateToProps)(Spinner));