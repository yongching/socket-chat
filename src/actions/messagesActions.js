import axios from 'axios';

export function fetchMessages() {
	return function(dispatch) {

		dispatch({type: 'FETCH_MESSAGES'});
		axios.get('http://localhost:3001/api/messages')
			.then((response) => {
				dispatch({type: 'FETCH_MESSAGES_FULFILLED', payload: response.data})
			})
			.catch((err) => {
				dispatch({type: 'FETCH_MESSAGES_REJECTED', payload: err})
			})
	}
}

export function storeMessage(message) {
	return function(dispatch) {

		dispatch({type: 'STORE_MESSAGE'});
		axios.post('http://localhost:3001/api/messages', message)
		    .then((response) => {
		    	dispatch({type: 'STORE_MESSAGE_FULFILLED', payload: response.data})
		    })
		    .catch((err) => {
		     	dispatch({type: 'STORE_MESSAGE_REJECTED', payload: err})
		    });
	}
}

export function addMessage(message) {
	return {
		type: 'ADD_MESSAGE',
		payload: message,
	}
}

