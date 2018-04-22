import React, {Component} from "react";
import Helmet from "../common/Helmet";
import './index.css';
import {withWrapper} from "create-react-server/wrapper";
import {connect} from "react-redux";
import {startUpdatingPosts, stopUpdatingPosts} from "../../actions/posts";
import Post from "../Post/Post";
import {Scrollbars} from "react-custom-scrollbars";

class Index extends Component {

	constructor(props) {
		super(props);
		props.dispatch(startUpdatingPosts());
		this.getPostsComponents.bind(this);
	}

	componentWillUnmount() {
		this.props.dispatch(stopUpdatingPosts());
	}

	getPostsComponents() {
		const posts = [];
		for (let post in this.props.posts) {
			posts.push(<Post postId={post} key={post}/>)
		}
		return posts.reverse();
	}

	renderScrollbarContainer() {
		return <div className="scroll-container_index"/>
	}

	render() {
		if (this.props.posts.length) {
			return null;
		}
		return (
			<div className={this.props.smallScreen ? 'small-screen' : ''} style={{position: 'relative', flexGrow: '1'}}>
				<Scrollbars
					renderView={this.renderScrollbarContainer.bind(this)}
				>
					<Helmet title='Index'/>
					<div className="container_index">
						{this.getPostsComponents()}
					</div>
				</Scrollbars>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		smallScreen: state.post.width <= 800,
		posts: state.posts
	}
};

export default withWrapper(connect(mapStateToProps)(Index));