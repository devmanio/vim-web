export function stringToInteger(str) {
	let result = '';
	for(let i = 0; i < str.length; i++) {
		result += str.charCodeAt(i);
	}
	return parseInt(result);
}