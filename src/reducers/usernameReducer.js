export default function reducer(state={
	username: null,
}, action) {

	switch (action.type) {
		case 'GET_USERNAME': {
			return {
				...state,
			}
		}

		case 'SET_USERNAME': {
			return {
				username: action.payload,
			}
		}

		default: {
			// Do nothing
		}
	}

	return state;
}

