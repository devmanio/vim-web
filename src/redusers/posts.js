export default function posts(state = {}, action) {
	switch (action.type) {
		case 'GET_POSTS_SUCCESS':
			return {
				...state,
				...action.posts
			};
		case 'LIKE_POST':
			return {
				...state,
				[action.postId]: {
					...state[action.postId],
					likes: [...state[action.postId].likes, action.userId]
				}
			};
		case 'DISLIKE_POST':
			const likes = state[action.postId].likes;
			let newLikes = likes.slice(0, likes.length);
			newLikes.splice(likes.indexOf(action.userId), 1);
			return {
				...state,
				[action.postId]: {
					...state[action.postId],
					likes: newLikes
				}
			};
		default:
			return state;
	}
}