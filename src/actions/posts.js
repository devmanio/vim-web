import {getAccountInfo, getPostsInfo, getVoteInfo} from "../services/eosio";
import {getStore} from "../app";

export function getPosts() {
	const state = getStore().getState();
	return async dispatch => {
		dispatch({
			type: 'GET_POSTS_REQUEST'
		});
		try {
			const posts = await getPostsInfo();
			console.log(posts);
			const likes = await await getVoteInfo();
			console.log(likes);
			const account = await getAccountInfo(state.login.user);
			console.log(account);
			dispatch({
				type: 'GET_POSTS_SUCCESS',
				posts
			})
		} catch (e) {
			dispatch({
				type: 'GET_POSTS_ERROR',
				error: e
			})
		}
		/*const posts = [id]:{
			id: 1,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [3, 5, 8],
			payout: 4.32,
			author: 3
		}*/

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