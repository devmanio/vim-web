import {getStore} from "../app";

export function getNextPostId(){
	const posts = getStore().getState().posts;
	let maxValue = 0;
	for (let post in posts) {
		let postId = parseInt(post, 10);
		if (postId > maxValue) {
			maxValue = postId;
		}
	}
	return maxValue + 1;
}