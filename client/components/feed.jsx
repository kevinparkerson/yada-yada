import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import Message from '../components/message';

import '../styles/feed.scss';

const Feed = ({ messages, selectedChannelId }) => {
	const [lockAutoScroll, setLockAutoScroll] = useState(false);

	const feedRef = useRef(null);

	// Scroll after messages have been sent by another user
	useEffect(() => {
		if (!lockAutoScroll) {
			if (feedRef && feedRef.current) {
				feedRef.current.scrollTop = feedRef.current.scrollHeight;
			}
		} else if (lockAutoScroll !== selectedChannelId) {
			setLockAutoScroll(false);
		}
	});

	return (
		<div
			className="yada_feed"
			onScroll={() => {
				if (feedRef && feedRef.current) {
					const currentFeed = feedRef.current;
					if (currentFeed.scrollTop === (currentFeed.scrollHeight - currentFeed.offsetHeight)) {
						setLockAutoScroll(false);
					} else {
						setLockAutoScroll(selectedChannelId);
					}
				}
			}}
			ref={feedRef}
		>
			{messages.map((message, index) => {
				const previousMessage = (index - 1 >= 0) ? messages[index - 1] : {};
				return (
					<Message
						date={message.date}
						key={message.id}
						previousDate={previousMessage.date}
						previousSenderId={previousMessage.senderId}
						senderId={message.senderId}
						senderName={message.senderName}
						value={message.value}
					/>
				);
			})}
		</div>
	);
};

Feed.propTypes = {
	messages: PropTypes.array.isRequired,
	selectedChannelId: PropTypes.string.isRequired
};

export default Feed;
