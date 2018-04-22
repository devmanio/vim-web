const initialState = {
	creating: false,
	updatingPosts: null,
	width: window.innerWidth,
	openedSend: false
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
		case 'OPEN_SEND':
			return {
				...state,
				openedSend: true
			};
		case 'CLOSE_SEND':
			return {
				...state,
				openedSend: false
			};
		case 'RESIZE_WINDOW':
			return {
				...state,
				width: window.innerWidth
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