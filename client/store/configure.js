import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export const history = createBrowserHistory();

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer(history),
		initialState,
		composeEnhancers(
			applyMiddleware(
				routerMiddleware(history),
				thunkMiddleware
			)
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers'); // eslint-disable-line global-require
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
