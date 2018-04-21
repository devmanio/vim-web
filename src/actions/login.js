import {push} from "react-router-redux";
import {createAccount} from "../services/eosio";
import {stringToInteger} from "../utils/converter";

export function login(user, postingKey) {
	return dispatch => {
		dispatch({
			type: "LOGIN_SUCCESS",
			user,
			postingKey,
			userId: 1
		});
	}
}

export function registration(name) {
	return async dispatch => {
		dispatch({
			type: 'REGISTRATION_REQUEST',
			name
		});
		const response = await createAccount(name);
		console.log(response);
		dispatch({
			type: 'REGISTRATION_SUCCESS',
			postingKey: response.pass,
			user: response.login,
			userId: stringToInteger(response.login)
		});
	}
}

export function logout() {
	return dispatch => {
		dispatch({
			type: "LOGOUT"
		});
		dispatch(push('/login'));
	}
}