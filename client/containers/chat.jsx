import { push } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPrivateChannels, setHasUnreadMessages } from '../actions/channels';
import { getChannelMessages, sendMessage } from '../actions/messages';

import Feed from '../components/feed';
import Header from '../components/header';
import Menu from '../components/menu';
import SubmitMessage from '../components/submit-message';

import { connectSocket, disconnectSocket, getConnectedUsers } from './socket';

import getChannelIdFromLocationPathname from '../utils/getChannelIdFromLocationPathname';

import '../styles/chat.scss';

// Chat container to control chat page. Contains as few presentational elements as possible, utilizing components
// for this purpose instead
const Chat = () => {
	// Dispatch and useful items from app store
	const dispatch = useDispatch();
	const location = useSelector(state => state.router.location);
	const messages = useSelector(state => state.messages);
	const privateChannels = useSelector(state => state.channels.private);
	const publicChannels = useSelector(state => state.channels.public);
	const user = useSelector(state => state.core.user);

	const [connectedSocket, setConnectedSocket] = useState(null);
	const [hasRequestedInitialChannelMessages, setHasRequestedInitialChannelMessages] = useState(false);
	const [hasRequestedPrivateChannels, setHasRequestedPrivateChannels] = useState(false);

	const selectedChannelId = getChannelIdFromLocationPathname(location.pathname);

	// Disconnect sockets when Chat dismounts (though currently this doesn't happen within normal app flow)
	useEffect(() => {
		return () => {
			disconnectSocket(connectedSocket);
		}
	}, []);

	if (!connectedSocket) {
		setConnectedSocket(connectSocket(dispatch, user));
	}

	if (connectedSocket && !hasRequestedPrivateChannels) {
		dispatch(getPrivateChannels()).then(() => {
			getConnectedUsers(dispatch, connectedSocket);
		});
		setHasRequestedPrivateChannels(true);
	}

	if (!hasRequestedInitialChannelMessages) {
		dispatch(getChannelMessages(selectedChannelId));
		setHasRequestedInitialChannelMessages(true);
	}

	return (
		<div className="yada_chat">
			<div className="yada_chat-sidebar">
				<Header username={user.username} />
				<Menu
					onChannelClick={(channelId) => {
						dispatch(push(`/chat/${channelId}`));
						dispatch(getChannelMessages(channelId)).then(() => {
							dispatch(setHasUnreadMessages(channelId));
						});
					}}
					publicChannels={publicChannels}
					privateChannels={privateChannels}
					selectedChannelId={selectedChannelId}
				/>
			</div>
			<div className="yada_chat-main">
				<Feed messages={messages} selectedChannelId={selectedChannelId} />
				<SubmitMessage
					onMessageSubmit={(value) => {
						dispatch(sendMessage(selectedChannelId, value));
					}}
				/>
			</div>
		</div>
	);
};

export default Chat;
