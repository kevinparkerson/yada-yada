import PropTypes from 'prop-types';
import React from 'react';

import playSound from '../utils/playSound';

import '../styles/header.scss';

const Header = ({ username }) => (
	<div className="yada_header">
		<div className="yada_header-icon" />
		<div className="yada_header-user">
			<div className="yada_header-user-status" />
			<div className="yada_header-user-name">{username}</div>
		</div>
		<a
			className="yada_header-logout"
			href="/logout"
			onClick={() => {
				playSound('doorslam');
			}}
		/>
	</div>
);

Header.propTypes = {
	username: PropTypes.string.isRequired
};

export default Header;
