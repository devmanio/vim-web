const initialState = {
	creating: false,
	updatingPosts: null
};


export default function post(state = initialState, action) {
	switch (action.type) {
		case 'CREATE_POST_SUCCESS':
			return {
				...state,
				creating: false
			};
		case 'CREATE_POST_REQUEST':
			return {
				...state,
				creating: true
			};
		case 'START_UPDATING_POST':
			return {
				...state,
				updatingPosts: action.timeout
			};
		case 'STOP_UPDATING_POST':
			return {
				...state,
				updatingPosts: null
			};
		default:
			return state;
	}
}