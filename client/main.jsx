import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import configureStore, { history } from './store/configure';

import Chat from './containers/chat';

import './styles/main.scss';

const store = configureStore();

// Needed for Hot Module Replacement
if (typeof(module.hot) !== 'undefined') {
	module.hot.accept(); // eslint-disable-line no-undef
}

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div className="yada">
					{/* This is where routes to other containers would go if this app had more page routes :) */}
					<Route path="/chat/:channel" component={Chat} />
				</div>
			</ConnectedRouter>
		</Provider>,
		document.getElementById('yada_mount')
	);
};

render();
