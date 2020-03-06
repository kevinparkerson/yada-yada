import {
	POPULATE_PRIVATE_CHANNELS,
	SET_HAS_UNREAD_MESSAGES,
	SET_LAST_VISITED_CHANNEL,
	SET_ONLINE_STATUS
} from '../actions/channels';

export const initialState = {
	lastVisited: 'general',
	private: [],
	public: [
		{
			hasUnreadMessages: false,
			id: 'general',
			name: 'general'
		}
	]
};

export default function channels (state = initialState, action) {
	switch (action.type) {
		case POPULATE_PRIVATE_CHANNELS: {
			return {
				...state,
				private: [
					...action.privateChannels
				]
			};
		}
		case SET_LAST_VISITED_CHANNEL: {
			return {
				...state,
				lastVisited: action.channelId
			}
		}
		case SET_HAS_UNREAD_MESSAGES: {
			const channelType = (action.channelId === 'general') ? 'public' : 'private';

			return {
				...state,
				[channelType]: state[channelType].map((channel) => {
					if (action.channelId === channel.id) {
						return {
							...channel,
							hasUnreadMessages: action.hasUnreadMessages
						};
					}
					return channel;
				})
			};
		}
		case SET_ONLINE_STATUS: {
			return {
				...state,
				private: state.private.map((channel) => {
					if (action.userStatuses[channel.userId] !== undefined) {
						return {
							...channel,
							isOnline: action.userStatuses[channel.userId]
						};
					}
					return channel;
				})
			};
		}
		default: {
			return state;
		}
	}
}
