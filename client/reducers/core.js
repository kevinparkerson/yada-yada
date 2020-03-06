export const initialState = {
	user: window.USER_DATA || {}
};

if (window.USER_DATA) {
	delete window.USER_DATA;
}

export default function core (state = initialState, action) {
	switch (action.type) {
		default: {
			return state;
		}
	}
}
