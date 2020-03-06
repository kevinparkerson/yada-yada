import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import channels from './channels';
import core from './core';
import messages from './messages';

const rootReducer = (history) => combineReducers({
	channels,
	core,
	messages,
	router: connectRouter(history)
});

export default rootReducer;
