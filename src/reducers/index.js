import { combineReducers } from 'redux';

import username from './usernameReducer';
import messages from './messagesReducer';

export default combineReducers({
	username,
	messages,	
})

