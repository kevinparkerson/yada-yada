import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '../styles/channel.scss';

const Channel = ({ hasUnreadMessages, id, isOnline, onClick, name, selectedChannelId, type }) => (
	<a
		className={classnames('yada_channel', {
			'yada_channel--selected': id === selectedChannelId,
			'yada_channel--unread': hasUnreadMessages
		})}
		href="#"
		id={id}
		onClick={(e) => {
			e.preventDefault();
			onClick(id);
		}}
	>
		{(type === 'public') ? (
			<span className="yada_channel-hashtag">#</span>
		) : (
			<span className={classnames('yada_channel-status', {
				'yada_channel-status--online': isOnline
			})}/>
		)}
		<span className="yada_channel-text">{name}</span>
	</a>
);

Channel.defaultProps = {
	onClick: () => {}
};

Channel.propTypes = {
	hasUnreadMessages: PropTypes.bool,
	id: PropTypes.string.isRequired,
	isOnline: PropTypes.bool,
	onClick: PropTypes.func,
	name: PropTypes.string.isRequired,
	selectedChannelId: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default Channel;
