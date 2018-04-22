const HOST = 'http://192.168.43.3:8888';
const CREATE_ACCOUNT = '/v1/hackathon_plgn/create_account';
const CREATE_POST = '/v1/hackathon_plgn/create_post';
const LOGIN = '/v1/hackathon_plgn/autorization';
const LIKE = '/v1/hackathon_plgn/upvote';
const DISLIKE = '/v1/hackathon_plgn/downvote';
const INFO = '/v1/chain/get_table_rows';

const POST = "POST";

export function logIn(login, postingKey) {
	return customerFetch(LOGIN, POST, JSON.stringify([login, postingKey]));
}

export function createAccount(name) {
	return customerFetch(CREATE_ACCOUNT, POST, JSON.stringify([name]));
}

export function savePost(name, postingKey, url, hash) {
	return customerFetch(CREATE_POST, POST, JSON.stringify([name, postingKey, url, hash]));
}

export function upvote(postId, name) {
	return customerFetch(LIKE, POST, JSON.stringify([postId, name]));
}

export function downvote(postId, name) {
	return customerFetch(DISLIKE, POST, JSON.stringify([postId, name]));
}

export function getPostsInfo() {
	return customerFetch(INFO, POST, '{"scope":"hackathon", "code":"hackathon", "table":"posttable", "json": true}');
}

export function getVoteInfo() {
	return customerFetch(INFO, POST, '{"scope":"hackathon", "code":"hackathon", "table":"votetable", "json": true}');
}

export function getAccountInfo(name) {
	return customerFetch(INFO, POST, '{"scope":"hackathon", "code":"'+ name +'", "table":"accounts", "json": true}');
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
