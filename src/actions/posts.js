import {getAccountInfo, getPostsInfo, getVoteInfo} from "../services/eosio";
import {getStore} from "../app";

export function getPosts() {
	return async dispatch => {
		dispatch({
			type: 'GET_POSTS_REQUEST'
		});
		const posts = await getPostsInfo();
		const likes = await await getVoteInfo();
		const account = await getAccountInfo(name);
		/*const posts = [id]:{
			id: 1,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [3, 5, 8],
			payout: 4.32,
			author: 3
		}*/
		dispatch({
			type: 'GET_POSTS_SUCCESS',
			posts
		})
	}
}

export function stopUpdatingPosts() {
	const timeout = getStore().getState().post.updatingPosts;
	if (timeout) {
		clearInterval(timeout);
	}
	return {
		type: 'STOP_UPDATING_POST'
	}
}

export function startUpdatingPosts() {
	return dispatch => {
		dispatch({
			type: 'START_UPDATING_POST',
			timeout: setInterval(() => {
				dispatch(getPosts());
			}, 3000)
		})
	}
}