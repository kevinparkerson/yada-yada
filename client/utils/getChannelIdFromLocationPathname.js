export default function getChannelIdFromLocationPathname (locationPathname) {
	let selectedChannelId = locationPathname.split('chat/');
	if (selectedChannelId[1]) {
		selectedChannelId = selectedChannelId[1].replace('/', '');
	} else {
		selectedChannelId = 'general'; // Default to 'general' if the url is weird
	}

	return selectedChannelId;
}
