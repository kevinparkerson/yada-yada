import getChannelIdFromLocationPathname from '../utils/getChannelIdFromLocationPathname';
import playSound from '../utils/playSound';

/*
 * Action types
 */

export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const SET_CHANNEL_MESSAGES = 'SET_CHANNEL_MESSAGES';

/*
 * Action creators
 */

export function appendMessage (message) {
	return { message, type: APPEND_MESSAGE }
}

export function setChannelMessages (messages) {
	return { messages, type: SET_CHANNEL_MESSAGES }
}

/*
 * Thunks
 */

export const getChannelMessages = (channelId, checkIfCurrentChannel) => {
	return async (dispatch, getState) => {
		const location = getState().router.location;
		const currentChannelId = getChannelIdFromLocationPathname(location.pathname);

		if (checkIfCurrentChannel && currentChannelId !== channelId) {
			return { channelIdNotCurrent: true, success: false };
		}

		const response = await fetch(`/messages/${channelId}`);

		if (response.ok) {
			const data = await response.json();

			if (data.messages) {
				dispatch(setChannelMessages(data.messages));
			}

			return { success: true };
		}

		return { success: false };
	}
};

export const sendMessage = (channelId, value) => {
	return async (dispatch, getState) => {
		const response = await fetch('/messages', {
			body: JSON.stringify({ channelId, value }),
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
		});

		if (response.ok) {
			const data = await response.json();
			const location = getState().router.location;
			const currentChannelId = getChannelIdFromLocationPathname(location.pathname);

			if (currentChannelId === data.message.channelId) {
				dispatch(appendMessage(data.message));
				playSound('imsend');
			}

			return { success: true };
		}

		return { success: false };
	}
};
