const initialState = {
	user: '',
	postingKey: '',
	userId: 0
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
		case 'REGISTRATION_SUCCESS':
			return {
				...state,
				user: action.user,
				postingKey: action.postingKey,
				userId: action.userId
			};
		case 'LOGOUT':
			return {
				...state,
				user: '',
				postingKey: '',
				userId: 0
			};
		default:
			return state;
	}
}