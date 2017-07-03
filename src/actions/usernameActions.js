export function getUsername() {
	return {
		type: 'GET_USERNAME',
	}
}

export function setUsername(name) {
	return {
		type: 'SET_USERNAME',
		payload: name,
	}
}

