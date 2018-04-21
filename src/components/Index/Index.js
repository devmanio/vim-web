import React, {Component} from "react";
import Helmet from "../common/Helmet";
import './index.css';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from "react-redux";
import {getPosts, getPostsI} from "../../actions/posts";
import Post from "../Post/Post";
import {Scrollbars} from "react-custom-scrollbars";

class Index extends Component {

	constructor(props) {
		super(props);
		props.dispatch(getPosts());
		this.getPostsComponents.bind(this);
		props.dispatch(getPostsI());
	}

	getPostsComponents() {
		const posts = [];
		for (let post in this.props.posts) {
			posts.push(<Post postId={post} key={post}/>)
		}
		return posts;
	}

	renderScrollbarContainer() {
		return <div className="scroll-container_index"/>
	}

	render() {
		if (this.props.posts.length) {
			return null;
		}
		return (
			<Scrollbars
				renderView={this.renderScrollbarContainer.bind(this)}
			>
				<Helmet title='Index'/>
				<div className="container_index">
					{this.getPostsComponents()}
				</div>
			</Scrollbars>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.posts
	}
};

export default withWrapper(connect(mapStateToProps)(Index));