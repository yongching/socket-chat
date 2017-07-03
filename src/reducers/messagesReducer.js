export default function reducer(state={
	messages: [],
	fetching: false,
	fetched: false,
	error: null,
	new: null,
	storing: false,
	stored: false,
}, action) {

	switch (action.type) {
		case "FETCH_MESSAGES": {
			return {...state, fetching: true}
		}

		case "FETCH_MESSAGES_REJECTED": {
			return {...state, fetching: false, error: action.payload}
		}

		case "FETCH_MESSAGES_FULFILLED": {
			return {
				...state,
				fetching: false,
				fetched: true,
				messages: {...state}.messages.concat(action.payload),
			}
		}

		case "STORE_MESSAGE": {
			return {...state, storing: true}
		}

		case "STORE_MESSAGE_REJECTED": {
			return {...state, storing: false, error: action.payload}
		}

		case "STORE_MESSAGE_FULFILLED": {
			return {
				...state,
				storing: false,
				stored: true,
			}
		}

		case "ADD_MESSAGE": {
			return {
				...state,
				messages: [...state.messages, action.payload],
			}
		}

		default: {
			// Do nothing
		}
	}

	return state;
}

