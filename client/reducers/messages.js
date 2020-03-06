import {
	APPEND_MESSAGE,
	SET_CHANNEL_MESSAGES
} from '../actions/messages';

export default function messages (state = [], action) {
	switch (action.type) {
		case APPEND_MESSAGE: {
			return [
				...state,
				{
					...action.message
				}
			];
		}
		case SET_CHANNEL_MESSAGES: {
			return [
				...action.messages
			];
		}
		default: {
			return state;
		}
	}
}
