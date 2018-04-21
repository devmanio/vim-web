let userName = '';
let postingKey = '';

export function loadConfig(path) {
	const httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", path, true);
	httpRequest.onreadystatechange = () => {
		if (httpRequest.readyState !== 4) {
			return;
		}
		if (httpRequest.status !== 200) {
			console.log('httpRequest.status = ' + httpRequest.status);
			return;
		}
		const result = httpRequest.responseText.split(' ');
		userName = result[0];
		postingKey = result[1];
	};
	httpRequest.send(null);
}

export function getUserName() {
	return userName;
}

export function getPostingKey() {
	return postingKey;
}