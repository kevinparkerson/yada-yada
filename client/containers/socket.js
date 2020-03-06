// This file doesn't fit the typical container mold, but because these socket methods share a similar "controller"
// purpose within the application it seemed fitting for it to live in the same place

import socketIO from 'socket.io-client';

import { setHasUnreadMessages, setOnlineStatus } from '../actions/channels';
import { getChannelMessages } from '../actions/messages';

import playSound from '../utils/playSound';

export const connectSocket = (dispatch, user) => {
	const socket = socketIO.connect();

	socket.on('broadcast', (data) => {
		if (data.type === 'new_message') {
			const message = data.message;
			if (user.id !== message.senderId &&
				(message.channelId === 'general' || (message.receiverId && message.receiverId === user.id))
			) {
				dispatch(getChannelMessages(message.channelId, true)).then((response) => {
					if (response.success) {
						playSound('imrcv');
					} else if (response.channelIdNotCurrent) {
						dispatch(setHasUnreadMessages(message.channelId, true));
					}
				});
			}
		}
	});

	socket.on('user_connected', (user) => {
		dispatch(setOnlineStatus({ [user.id]: true }));
		playSound('dooropen');
	});

	socket.on('user_disconnected', (user) => {
		dispatch(setOnlineStatus({ [user.id]: false }));
		playSound('doorslam');
	});

	socket.emit('user_connected', user);

	return socket;
};

export const disconnectSocket = (socket) => {
	socket.disconnect();
};

export const getConnectedUsers = (dispatch, socket) => {
	socket.on('get_connected_users', (connectedUsers) => {
		const userStatuses = {};

		Object.keys(connectedUsers).forEach((key) => {
			userStatuses[key] = true;
		});

		dispatch(setOnlineStatus(userStatuses));
		playSound('dooropen');
	});

	socket.emit('get_connected_users');
};
