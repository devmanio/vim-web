import {getStore} from "../app";
import steem from 'steem';
import {compressJPEG} from "../utils/compressor";
import {getPostingKey, getUserName, loadConfig} from "../utils/configReader";
import {stringToInteger} from "../utils/converter";

loadConfig('/config.txt');

export function changeLike(postId) {
	const state = getStore().getState();
	const userId = state.auth.userId;
	const post = state.posts[postId];
	return dispatch => {
		if (post.likes.includes(userId)) {
			dispatch(dislike(postId, userId));
		} else {
			dispatch(like(postId, userId));
		}
	}
}

function dislike(postId, userId) {
	return {
		type: 'DISLIKE_POST',
		postId,
		userId
	}
}

function like(postId, userId) {
	return {
		type: 'LIKE_POST',
		postId,
		userId
	}
}

export function createPost(file) {
	return async dispatch => {
		dispatch({
			type: 'CREATE_POST_REQUEST'
		});
		let blob = await compressJPEG(file);
		let response = await _fileUpload(blob);
		//TODO send to back
		const name = 'wwwwwwwwwwwww';
		const post = {
			id: stringToInteger(name),
			url: response.url,
			hash: response['ipfs_hash'],
			likes: [],
			payout: 0,
			author: name
		};
		dispatch({
			type: 'CREATE_POST_SUCCESS',
			posts: {
				[stringToInteger(name)]: post
			}
		})
	}
}

function _fileUpload(file) {
	const operation = ['comment', {
		parent_author: '',
		parent_permlink: 'tag',
		author: getUserName(),
		permlink: '',
		title: 'title',
		description: 'description',
		body: 'empty',
		json_metadata: {
			tags: ['tag'],
			app: 'steepshot'
		}
	}];
	return _preCompileTransaction(operation)
		.then(transaction => {
			let form = new FormData();
			form.append('file', file);
			form.append('trx', JSON.stringify(transaction));
			return fetch('https://qa.steepshot.org/api/v1_1/media/upload', {
				method: 'POST',
				body: form
			}).then(response => response.json())
		})
}

function _preCompileTransaction(operation) {
	return steem.broadcast._prepareTransaction({
		extensions: [],
		operations: [operation],
	}).then((transaction) => {
		return new Promise((resolve, reject) => {
			try {
				resolve(steem.auth.signTransaction(transaction, [getPostingKey()]));
			} catch (err) {
				reject(new Error("Invalidate posting key."));
			}
		})
	});
}