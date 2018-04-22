const initialState = {
	user: 'a',
	postingKey: 'a',
	userId: 1,
	error: '',
	login: false,
	logout: false,
	money: 0
};

export default function login(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
		case 'REGISTRATION_SUCCESS':
			return {
				...state,
				user: action.user,
				postingKey: action.postingKey,
				userId: action.userId,
				login: false
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				login: false,
				error: action.message
			};
		case 'LOGIN_REQUEST':
		case 'REGISTRATION_REQUEST':
			return {
				...state,
				login: true,
				error: ''
			};
		case 'LOGOUT_REQUEST':
			return {
				...state,
				logout: true
			};
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				user: '',
				postingKey: '',
				userId: 0,
				logout: false
			};
		case 'UPDATE_MONEY':
			return {
				...state,
				money: action.money
			};
		default:
			return state;
	}
}