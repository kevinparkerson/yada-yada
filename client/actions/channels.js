/*
 * Action types
 */

export const POPULATE_PRIVATE_CHANNELS = 'POPULATE_PRIVATE_CHANNELS';
export const SET_HAS_UNREAD_MESSAGES = 'SET_HAS_UNREAD_MESSAGES';
export const SET_ONLINE_STATUS = 'SET_ONLINE_STATUS';

/*
 * Action creators
 */

export function populatePrivateChannels (privateChannels) {
	return { privateChannels, type: POPULATE_PRIVATE_CHANNELS };
}

export function setHasUnreadMessages (channelId, hasUnreadMessages) {
	return { channelId, hasUnreadMessages, type: SET_HAS_UNREAD_MESSAGES };
}

export function setOnlineStatus (userStatuses) {
	return { userStatuses, type: SET_ONLINE_STATUS };
}

/*
 * Thunks
 */

export const getPrivateChannels = () => {
	return async (dispatch, getState) => {
		const appUser = getState().core.user;
		const response = await fetch('/users');

		if (response.ok) {
			const data = await response.json();
			const filteredUsers = (data && data.users || []).filter((user) => (appUser.id !== user.id));
			const channels = filteredUsers.map((user) => ({
				hasUnreadMessages: false,
				id: (appUser.id < user.id) ? `${appUser.id}-${user.id}` : `${user.id}-${appUser.id}`,
				isOnline: false,
				name: user.username,
				userId: user.id
			}));

			dispatch(populatePrivateChannels(channels));
			return { success: true };
		}

		return { success: false };
	}
};
