import {getPostsInfo, getVoteInfo} from "../services/eosio";

export function getPosts() {
	const posts = {
		'1': {
			id: 1,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [3, 5, 8],
			payout: 4.32,
			author: 3
		},
		'2': {
			id: 2,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [3, 8],
			payout: 1.32,
			author: 3
		},
		'3': {
			id: 3,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [1, 3, 8, 10, 14],
			payout: 6.32,
			author: 1
		},
		'4': {
			id: 4,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [8],
			payout: 0.32,
			author: 8
		},
		'5': {
			id: 5,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [3, 8],
			payout: 1.32,
			author: 3
		},
		'6': {
			id: 6,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [1, 3, 8, 10, 14],
			payout: 6.32,
			author: 1
		},
		'7': {
			id: 7,
			url: '/images/test.jpg',
			hash: 'QmT3tc4Ju9K7n1fE6smJW32fMz7UHWsgWYjzQDvbEmDbFp',
			likes: [8],
			payout: 0.32,
			author: 8
		},
	};
	return {
		type: 'GET_POSTS_SUCCESS',
		posts
	}
}

export function getPostsI() {
	return async dispatch => {
		const response = await getVoteInfo();
		dispatch({
			type: 'GET_POSTS_INFO',
			response
		});
	}
}