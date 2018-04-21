const HOST = 'http://192.168.43.3:8888';
const CREATE_ACCOUNT = '/v1/hackathon_plgn/create_account';
const LOGIN = '/v1/wallet/unlock';

const POST = "POST";

export function logIn(login, postingKey) {
	return customerFetch(LOGIN, POST, JSON.stringify([login, postingKey]));
}

export function createAccount(name) {
	return customerFetch(CREATE_ACCOUNT, POST, JSON.stringify([name]));
}

function customerFetch(path, method, body) {
	return new Promise( (resolve, reject) => {
		const url = HOST + path;

		const httpRequest = new XMLHttpRequest();

		httpRequest.open(method, url, true);
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState !== 4) {
				return;
			}
			if (httpRequest.status !== 200) {
				console.error('httpRequest.status = ' + httpRequest.status);
				console.log(httpRequest);
				reject(new Error("Can't create account."));
				return;
			}
			resolve(JSON.parse(httpRequest.responseText));
		};
		httpRequest.send(body);
	});
}

/*
function customerFetch(path, method, body) {
	const url = HOST + path;
	return fetch(url, {
		method,
		mode: 'no-cors',
		body
	}).then( res =>
		console.log(res)
	);
}
*/
