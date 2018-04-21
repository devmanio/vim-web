const initialState = {
	creating: false
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
		default:
			return state;
	}
}