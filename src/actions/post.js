import {getStore} from "../app";
import steem from 'steem';
import {compressJPEG} from "../utils/compressor";
import {getPostingKey, getUserName, loadConfig} from "../utils/configReader";
import {downvote, savePost, upvote} from "../services/eosio";
import {getNextPostId} from "../utils/utils";
import {getPosts} from "./posts";

loadConfig('/config.txt');

export function changeLike(postId) {
	const state = getStore().getState();
	const name = state.login.user;
	const post = state.posts[postId];
	return dispatch => {
		if (post.likes.includes(name)) {
			dispatch(dislike(postId, name));
		} else {
			dispatch(like(postId, name));
		}
	}
}

function dislike(postId, name) {
	return async dispatch => {
		await downvote(postId, name);
		dispatch({
			type: 'DISLIKE_POST',
			postId,
			name
		});
	}
}

function like(postId, name) {
	return async dispatch => {
		await upvote(postId, name);
		dispatch({
			type: 'LIKE_POST',
			postId,
			name
		});
	}
}

export function createPost(file) {
	const state = getStore().getState();
	const name = state.login.user;
	return async dispatch => {
		dispatch({
			type: 'CREATE_POST_REQUEST'
		});
		const blob = await compressJPEG(file);
		let response = await _fileUpload(blob);
		const nextPostId = getNextPostId();
		const hash = response['ipfs_hash'];
		const imgUrl = response.url;
		try {
			await savePost(name, nextPostId, imgUrl, hash);
			const post = {
				id: nextPostId,
				url: imgUrl,
				hash: hash,
				likes: [],
				payout: 0,
				author: name
			};
			dispatch({
				type: 'CREATE_POST_SUCCESS',
				posts: {
					[nextPostId]: post
				}
			});
		} catch (e) {
			dispatch({
				type: 'CREATE_POST_ERROR',
				error: e
			})
		}
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