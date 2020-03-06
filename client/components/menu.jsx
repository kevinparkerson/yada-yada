import PropTypes from 'prop-types';
import React from 'react';

import Channel from '../components/channel';

import '../styles/menu.scss';

const generateChannels = (channelsSubset, onChannelClick, selectedChannelId, type) => (
	channelsSubset.map((channel) => (
		<Channel
			hasUnreadMessages={channel.hasUnreadMessages}
			id={channel.id}
			isOnline={channel.isOnline}
			key={channel.id}
			name={channel.name}
			onClick={onChannelClick}
			selectedChannelId={selectedChannelId}
			type={type}
		/>
	))
);

const Menu = ({ onChannelClick, privateChannels, publicChannels, selectedChannelId }) => (
	<div className="yada_menu">
		<h3 className="yada_menu-section">Channels</h3>
		{generateChannels(publicChannels, onChannelClick, selectedChannelId, 'public')}
		<h3 className="yada_menu-section yada_menu-section--padded-top">Direct Messages</h3>
		{generateChannels(privateChannels, onChannelClick, selectedChannelId, 'private')}
	</div>
);

Menu.defaultProps = {
	onChannelClick: () => {}
};

Menu.propTypes = {
	onChannelClick: PropTypes.func,
	privateChannels: PropTypes.array,
	publicChannels: PropTypes.array,
	selectedChannelId: PropTypes.string.isRequired
};

export default Menu;
