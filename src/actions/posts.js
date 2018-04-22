import {getAccountInfo, getPostsInfo, getVoteInfo} from "../services/eosio";
import {getStore} from "../app";

export function getPosts() {
	const state = getStore().getState();
	return async dispatch => {
		dispatch({
			type: 'GET_POSTS_REQUEST'
		});
		try {
			const likes = await await getVoteInfo();
			const posts = await getPostsInfo();

			let postsStr;
			let info;
			let postsArray = {};
			let like;
			let postId;
			let likeArr;
			posts.rows.forEach(account => {
				postsStr = account.data.split('@');
				postsStr.forEach(post => {
					info = post.split('$');
					postId = parseInt(info[0]);
					like = getLike(likes.rows, postId);
					if (like) {
						likeArr = like.data.split('@');
						likeArr = getUnicValue(likeArr);
					} else {
						likeArr = [];
						like = {cost: '0'};
					}
					postsArray[postId] = {
						id: postId,
						url: info[1],
						hash: info[2],
						likes: likeArr,
						payout: parseFloat(like['cost'].split(' ')[0]),
						author: account.account
					}

				})
			});
			const account = await getAccountInfo(state.login.user);
			dispatch({
				type: 'UPDATE_MONEY',
				money: account.rows[0].balance
			});
			dispatch({
				type: 'GET_POSTS_SUCCESS',
				posts: postsArray
			})
		} catch (e) {
			console.log(e);
			dispatch({
				type: 'GET_POSTS_ERROR',
				error: e
			})
		}
	}
}

function getLike(likes, postId) {
	let result = null;
	likes.forEach(like => {
		if (like['uuid_post'] == postId) {
			result = like;
			return result;
		}
	});
	return result;
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

function getUnicValue(arg) {
	const result = [];
	const obj = {};

	for (let i = 0; i < arg.length; i++) {
		obj[arg[i]] = arg[i];
	}

	for (let i in obj) {
		result.push(obj[i])
	}

	return result;
}

