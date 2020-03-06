import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import '../styles/message.scss';

const Message = ({ date, previousDate, previousSenderId, senderId, senderName, value }) => (
	<div className="yada_message">
		{
			(
				!previousDate || !previousSenderId ||	// Very first message in channel
				senderId !== previousSenderId ||	// Different user posted the message
				moment(date).diff(moment(previousDate)) > 600000	// Last message was over 10 minutes ago
			) ? (
				<div className="yada_message-details">
					<div className="yada_message-name">{senderName}</div>
					<div className="yada_message-date">{moment(date).format('MMMM Do YYYY, h:mm a')}</div>
				</div>
			) : null
		}
		<div className="yada_message-value">{value}</div>
	</div>
);

Message.defaultProps = {
	value: ''
};

Message.propTypes = {
	date: PropTypes.string.isRequired,
	previousDate: PropTypes.string,
	previousSenderId: PropTypes.string,
	senderId: PropTypes.string.isRequired,
	senderName: PropTypes.string.isRequired,
	value: PropTypes.string
};

export default Message;
