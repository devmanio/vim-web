import {push} from "react-router-redux";
import {createAccount, logIn} from "../services/eosio";
import {stringToInteger} from "../utils/converter";

export function login(user, postingKey) {
	return async dispatch => {
		dispatch({
			type: "LOGIN_REQUEST",
			name: user,
			postingKey
		});
		try {
			const result = await logIn(user, postingKey);
			dispatch({
				type: "LOGIN_SUCCESS",
				user,
				postingKey,
				userId: stringToInteger(user)
			});
			dispatch(push('/index'));
		} catch (e) {
			dispatch({
				type: 'LOGIN_ERROR',
				message: "Something went wrong",
				error: e
			})
		}
	}
}

export function registration(name) {
	return async dispatch => {
		dispatch({
			type: 'REGISTRATION_REQUEST',
			name
		});
		try {
			const response = await createAccount(name);
			dispatch({
				type: 'REGISTRATION_SUCCESS',
				postingKey: response.pass,
				user: response.login,
				userId: stringToInteger(response.login)
			});
			dispatch(push('/index'));
		} catch (e) {
			dispatch({
				type: 'LOGIN_ERROR',
				message: "Something went wrong",
				error: e
			})
		}
	}
}

export function logout() {
	return async dispatch => {
		dispatch({
			type: "LOGOUT_REQUEST"
		});
		try {
			const response = await createAccount(name);
			dispatch({
				type: 'LOGOUT_SUCCESS',
			});
			dispatch(push('/login'));
		} catch (e) {
			dispatch({
				type: 'LOGIN_ERROR',
				message: "Something went wrong",
				error: e
			})
		}
	}
}